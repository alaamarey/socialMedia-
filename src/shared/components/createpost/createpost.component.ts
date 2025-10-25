import { AfterViewInit, Component, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../core/auth/services/users.service';
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'createpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css'
})
export class CreatepostComponent implements AfterViewInit {

  private readonly postsService = inject(PostsService);
  private readonly toastrService = inject(ToastrService);
  // private readonly usersService = inject(UsersService);


  contentControl: WritableSignal<FormControl> = signal<FormControl>
    (new FormControl(" "));

  modalElement: Signal<ElementRef> = viewChild.required<ElementRef>('createPost');

  imageSrc: WritableSignal<ArrayBuffer | null | string> = signal<ArrayBuffer | null | string>('');

  saveFile: WritableSignal<File | string> = signal<File | string>('');

  userId = signal<string>('');
  userName = signal<string>('');
  userPhoto = signal({});

  private modal: WritableSignal<Modal | null> = signal<Modal | null>(null);




  ngAfterViewInit(): void {
    if (this.modalElement())
      this.modal.set(new Modal(this.modalElement().nativeElement));
  }



  // getLoggedUserData() {
  //   this.usersService.getLoggedUserData().subscribe({
  //     next: (response => {
  //       this.userId.set(response.user._id);
  //       this.userName.set(response.user.name);
  //       this.userPhoto.set(response.user.photo);
  //     })
  //   })
  // }

  changeFile(e: Event): void {
    const inputElement = e.target as HTMLInputElement;
    console.log(inputElement.files);

    if (inputElement.files)
      this.saveFile.set(inputElement.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(this.saveFile() as File);

    reader.onload = () => {
      this.imageSrc.set(reader.result);
    }


  }

  submitForm(e: SubmitEvent) {
    e.preventDefault();
    const post = (e.submitter as HTMLButtonElement).value;
    const close = (e.submitter as HTMLButtonElement).value;
    console.log(close);

    if (close === 'close') {
      this.closeModal();
    }
    else if (post === 'post') {

      // formdata اعمل ال
      console.log(this.contentControl().value);
      console.log(this.saveFile());

      const formData = new FormData();
      formData.append('body', this.contentControl().value)
      if (this.saveFile())
        formData.append('image', this.saveFile() as File)
      // اكلم API      
      this.postsService.createPost(formData).subscribe({
        next: (res => {
          console.log(res);
          if (res.message === 'success') {
            this.getUserPosts();

            // const createPost = {
            //   _id: Date.now(),
            //   body: this.contentControl(),
            //   user: {
            //     _id: this.userId(),
            //     name: this.userName(),
            //     photo: this.userPhoto()
            //   },
            //   createdAt: Date.now(),
            //   comments: {
            //   },
            //   id: Date.now(),
            //   image: this.saveFile()
            // }








            // this.postsService.addNewPost(createPost);


            // modal  اقفل ال
            this.toastrService.success('Post Saved Successfully', 'LinkedPOsts', {
              positionClass: 'toast-top-center'
            })
            this.closeModal();
            this.contentControl().reset();
            this.saveFile.set('');
            this.imageSrc.set('');
          }
        })
      }

      )
    }

  }



  openModal(): void {
    this.modal()?.show();
  }

  closeModal() {
    this.modal()?.hide();
  }


  getUserPosts() {
    this.postsService.getUserPosts().subscribe({
      next: (response => {
        this.postsService.posts.set(response.posts);
      })
    })
  }




}
