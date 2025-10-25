import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../core/auth/services/users.service';
import { CommentsService } from '../../services/comments.service';
import { PostsService } from '../../services/posts.service';
import { CommentsComponent } from "./components/comments/comments.component";
import { CreatecommentComponent } from "./components/createcomment/createcomment.component";
import { Comment } from './components/createcomment/models/commentres.interface';
import { Post } from './model/postres.interface';
import { SweetalertService } from './service/sweetalert.service';


@Component({
  selector: 'post',
  imports: [DatePipe, CommentsComponent, RouterLink, CreatecommentComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly sweetalertService = inject(SweetalertService);



  post: InputSignal<Post> = input.required<Post>();
  comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  showList: WritableSignal<boolean> = signal<boolean>(false);
  showTextArea: WritableSignal<boolean> = signal<boolean>(false);
  commentContent: WritableSignal<FormControl> = signal<FormControl>(new FormControl('', [Validators.required]));
  canModify: InputSignal<boolean> = input<boolean>(false);
  isPostDetails: InputSignal<boolean> = input<boolean>(false);
  userId: WritableSignal<string | undefined> = signal('')


  ngOnInit(): void {
    this.userId.set(this.usersService.decodeToken()?.user);
  }


  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res => {
        this.postsService.userposts.set(res.posts);
      })
    })
  }


  getPostComments(postId: string): void {
    this.commentsService.getPostComment(postId).subscribe({
      next: (response => {
        console.log(response);
        this.comments.set(response.comments);
      })
    })
  }

  createComment(newComments: Comment[]) {
    this.comments.set(newComments);
    this.getPostComments(this.post().id);
  }

  getUserPosts() {
    this.postsService.getUserPosts().subscribe({
      next: (response => {
        this.postsService.userposts.set(response.posts);
      })
    })
  }

  deleteComment(commentId: string) {
    this.comments.update(old => old.filter(c => c._id !== commentId));
  }

  updateComment(updatedComment: any) {
    this.comments.update(old => old.map(c => c._id === updatedComment._id ? updatedComment : c));
  }


  deletePost(postId: string) {
    this.sweetalertService.confirm('delete this item', () => {
      this.postsService.deletePost(postId).subscribe({
        next: (response => {
          console.log(response);
          if (response.message === 'success') {
            this.getUserPosts()
          }
        })
      })
    })


  }





}
