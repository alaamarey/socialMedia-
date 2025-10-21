import { AfterViewInit, Component, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'flowbite';
import { PostsService } from '../../services/posts.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'createpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css'
})
export class CreatepostComponent implements AfterViewInit {

  private readonly postsService = inject(PostsService);
  private readonly toastrService = inject(ToastrService);








  contentControl: WritableSignal<FormControl> = signal<FormControl>
    (new FormControl(null, [Validators.required]));

  modalElement: Signal<ElementRef> = viewChild.required<ElementRef>('createPost');

  imageSrc: WritableSignal<ArrayBuffer | null | string> = signal<ArrayBuffer | null | string>('');

  saveFile: WritableSignal<File | string> = signal<File | string>('');

  private modal: WritableSignal<Modal | null> = signal<Modal | null>(null);


  ngAfterViewInit(): void {
    if (this.modalElement())
      this.modal.set(new Modal(this.modalElement().nativeElement));
  }



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
      if (this.contentControl().valid) {
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
              // modal  اقفل ال 
              this.toastrService.success('Post Saved Successfully', 'LinkedPOsts')
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

  }


  openModal(): void {
    this.modal()?.show();
  }

  closeModal() {
    this.modal()?.hide();
  }






}
