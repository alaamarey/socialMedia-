import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationInfo, Post } from '../../shared/components/post/model/postres.interface';
import { PostComponent } from "../../shared/components/post/post.component";
import { PostsService } from '../../shared/services/posts.service';
import { CreatepostComponent } from "../../shared/components/createpost/createpost.component";

@Component({
  selector: 'app-profile',
  imports: [PostComponent, RouterLink, CreatepostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {


  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);


  userPosts$: WritableSignal<Subscription> = signal<Subscription>(new Subscription);
  paginationInfo: WritableSignal<PaginationInfo> = signal<PaginationInfo>({} as PaginationInfo);
  showList: WritableSignal<boolean> = signal<boolean>(false);


  // posts: WritableSignal<Post[]> = signal<Post[]>([]);

  posts = computed(() => this.postsService.posts());

  ngOnInit(): void {
    // this.activatedRoute.data  Subject Behavior 
    // console.log(this.activatedRoute.data.subscribe(response => {
    //   this.posts.set(response['profile']);
    // }));


    this.activatedRoute.data.subscribe(response => {
      this.postsService.posts.set(response['profile']);

      // this.posts.set(response['profile']);
    })






  }





  // deletePost(postId: string | null): void {
  //   this.postsService.deletePost(postId).subscribe(response => {
  //     console.log(response);
  //     // this.getUserPosts();
  //   })
  // }




  // getUserPosts(): void {
  //   this.userPosts$.set(this.postsService.getUserPosts().subscribe(response => {
  //     if (response.message === 'success') {
  //       this.posts.set(response.posts)
  //       console.log(response);
  //     }
  //   }))
  // }


  ngOnDestroy(): void {
    this.userPosts$().unsubscribe();
  }

}
