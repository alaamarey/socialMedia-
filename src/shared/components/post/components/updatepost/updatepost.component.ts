import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../services/posts.service';
import { Post } from '../../model/postres.interface';

@Component({
  selector: 'app-updatepost',
  imports: [ReactiveFormsModule],
  templateUrl: './updatepost.component.html',
  styleUrl: './updatepost.component.css'
})
export class UpdatepostComponent {


  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);


  postId: WritableSignal<string | null> = signal('');

  postContent = signal<FormControl>(new FormControl('', [Validators.required]));
  postFile = signal<File | null>(null);
  imgSrc = signal<string | ArrayBuffer | null | File>('');

  oldFile = signal<string>('');





  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (response => {
        console.log(response['updatepost']);

        let post = response['updatepost'] as Post;

        this.postContent().patchValue(post.body);

        if (post.image) {
          this.imgSrc.set(post.image);
          this.oldFile.set(post.image);
        }
      })
    })

    this.activatedRoute.paramMap.subscribe(
      params => {
        this.postId.set(params.get('postId'));
      }
    )
  }


  changeFile(inputElement: HTMLInputElement): void {
    this.postFile.set(inputElement.files ? inputElement.files[0] : null);

    console.log(this.postFile());
    const reader = new FileReader();
    if (this.postFile()) {
      reader.readAsDataURL(this.postFile() as File);
      reader.onload = () => {
        this.imgSrc.set(reader.result);
      }
    }
  }


  updateFile(e: Event): void {
    e.preventDefault()
    if (this.postContent().valid) {

      console.log(this.postContent().value);
      console.log(this.postFile());

      const formData = new FormData();


      formData.append('body', this.postContent().value);
      if (this.postFile()) {
        formData.append('image', this.postFile() as File);
      }

      else {
        this.urlToFile(this.oldFile(), 'OldFile').then((oldFile) => {
          this.postFile.set(oldFile);
          formData.append('image', this.postFile() as File);
        })
      }



      this.postsService.updatePost(this.postId(), formData).subscribe({
        next: (res => {
          console.log(res);

          this.activatedRoute.params.subscribe(params => {
            console.log(params);

          })

          this.router.navigate(['profile'])
        })
      })
    }
  }


  async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }




}
