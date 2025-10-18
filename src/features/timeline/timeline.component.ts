import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreatepostComponent } from "../../shared/components/createpost/createpost.component";
import { PostComponent } from "../../shared/components/post/post.component";
import { PostsService } from '../../shared/services/posts.service';
import { Comment, PaginationInfo, Post, Postres } from './../../shared/components/post/model/postres.interface';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-timeline',
  imports: [CreatepostComponent, PostComponent, InfiniteScrollModule, FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);


  posts: WritableSignal<Post[]> = signal<Post[]>([]);
  paginationInfo: WritableSignal<PaginationInfo> = signal<PaginationInfo>({} as PaginationInfo);
  comments = signal<Comment[]>([]);


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      response => {
        const data = response['timeline'] as Postres;
        this.posts.set(data.posts);
        this.paginationInfo.set(data.paginationInfo);
      })


  }


  getAllPosts(pageNumber: number): void {
    this.postsService.getAllPosts(pageNumber).subscribe(response => {
      if (response.message === 'success')
        this.posts.set([...this.posts(), ...response.posts]);
      this.paginationInfo.set(response.paginationInfo);
    });
  }



  onScrollDown() {
    if (this.paginationInfo()?.nextPage) {
      this.getAllPosts(this.paginationInfo().nextPage);
    }
  }


}
