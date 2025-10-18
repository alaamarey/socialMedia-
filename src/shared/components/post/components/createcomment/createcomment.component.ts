import { Component, EventEmitter, inject, input, InputSignal, Output, output, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import { FormControl, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-createcomment',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './createcomment.component.html',
  styleUrl: './createcomment.component.css'
})
export class CreatecommentComponent {

  private readonly commentsService = inject(CommentsService);


  @Output() newComments = new EventEmitter<any>();



  content: WritableSignal<FormControl> = signal<FormControl>(new FormControl(null, [Validators.required, Validators.maxLength(30)]));
  postId: InputSignal<string | null> = input.required<string | null>();
  errorMsg: WritableSignal<string> = signal<string>('');




  createComment(): void {
    console.log(this.content());
    if (this.content().valid) {
      this.commentsService.createComment({ content: this.content().value, post: this.postId() }).subscribe(
        {
          next: (response => {
            if (response.message === 'success') {
              console.log(response);
              this.content().reset();
              this.newComments.emit(response.comments);
            }
          }), error: (error => {
            console.log(error);
            this.errorMsg.set(error.error.error)
          })
        }
      )
    }
  }






}
