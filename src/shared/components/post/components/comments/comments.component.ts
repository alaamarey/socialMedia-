import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, input, InputSignal, OnInit, Output, Renderer2, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';
import { Comment } from '../../model/postres.interface';
import { UsersService } from '../../../../../core/auth/services/users.service';

@Component({
  selector: 'comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly usersService = inject(UsersService);
  private readonly renderer = inject(Renderer2);

  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<Comment>();

  commentText: Signal<ElementRef | undefined> = viewChild('commentText');
  textArea: Signal<ElementRef | undefined> = viewChild('textarea');
  comment: InputSignal<Comment> = input.required<Comment>();
  singlePost: InputSignal<boolean | undefined> = input<boolean | undefined>();
  showTextArea: WritableSignal<boolean> = signal<boolean>(false);
  showList: WritableSignal<boolean> = signal<boolean>(false)
  userId = signal<string | undefined>('');
  commentContent: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required]));



  ngOnInit(): void {
    this.commentContent().setValue(this.comment().content);
    this.userId.set(this.usersService.decodeToken()?.user)
  }

  updateComment(commendId: string): void {
    console.log(this.comment());
    if (this.commentContent().valid) {
      this.commentsService.updateComment(commendId, { content: this.commentContent().value }).subscribe(response => {
        if (response.message === 'success') {
          console.log(response);
          this.renderer.setProperty(this.commentText()?.nativeElement, 'textContent', response.comment.content);
          this.commentContent().reset();
          this.renderer.setProperty(this.textArea()?.nativeElement, 'hidden', true);
          this.updated.emit(response.comment);
        }
      })
    }
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe({
      next: (res => {
        console.log(res);

      })
    }
    )
  }


}
