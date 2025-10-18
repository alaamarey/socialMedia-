import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from "../../shared/components/post/components/comments/comments.component";
import { PostComponent } from "../../shared/components/post/post.component";
import { Comment, Post } from './../../shared/components/post/model/postres.interface';
import { CreatecommentComponent } from "../../shared/components/post/components/createcomment/createcomment.component";

@Component({
  selector: 'app-postdetails',
  imports: [PostComponent, CommentsComponent, CreatecommentComponent],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css'
})
export class PostdetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);


  post: WritableSignal<Post> = signal<Post>({} as Post)
  comments = signal<Comment[]>([]);


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      response => {
        console.log(response['postdetails']);
        let post = response['postdetails'] as Post;
        this.post.set(response['postdetails'])
        this.comments.set(post.comments);
      }
    )
  }
}
