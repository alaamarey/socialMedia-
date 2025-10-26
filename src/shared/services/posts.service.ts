import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, Postres, SinglePost } from '../components/post/model/postres.interface';
import { API_URL } from '../../token/token_ApI_URL';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly httpClient = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  userposts: WritableSignal<Post[]> = signal<Post[]>([]);
  //allPosts: WritableSignal<Post[]> = signal<Post[]>([]);


  createPost(body: object): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.API_URL + 'posts', body);
  }



  // addNewPost(newPost: any): void {
  //   this.allPosts.update(posts => [newPost, ...this.allPosts()]);
  // }




  getAllPosts(pageNumber: number = 1): Observable<Postres> {
    return this.httpClient.get<Postres>(this.API_URL + `posts?limit=50&page=${pageNumber}`, {
      headers: {
        'no-spinner': 'true'
      }
    });
  }



  getSinglePost(postId: string | null): Observable<SinglePost> {
    return this.httpClient.get<SinglePost>(this.API_URL + `posts/${postId}`);
  }


  getUserPosts(): Observable<Postres> {
    return this.httpClient.get<Postres>(this.API_URL + `users/664bcf3e33da217c4af21f00/posts?limit=10`);
  }


  updatePost(postId: string | null, body: object): Observable<any> {
    return this.httpClient.put(this.API_URL + `posts/${postId}`, body);
  }




  deletePost(postId: string | null): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(this.API_URL + `posts/${postId}`);
  }




}
