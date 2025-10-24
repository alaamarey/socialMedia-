import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, Postres, SinglePost } from '../components/post/model/postres.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly httpClient = inject(HttpClient);

  posts: WritableSignal<Post[]> = signal<Post[]>([]);
  // allPosts : WritableSignal<Post[]> = signal<Post[]>([]); 




  createPost(body: object): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(environment.baseURL + 'posts', body);
  }


  getAllPosts(pageNumber: number = 1): Observable<Postres> {
    return this.httpClient.get<Postres>(environment.baseURL + `posts?limit=50&page=${pageNumber}`, {
      headers: {
        'no-spinner': 'true'
      }
    });
  }



  getSinglePost(postId: string | null): Observable<SinglePost> {
    return this.httpClient.get<SinglePost>(environment.baseURL + `posts/${postId}`);
  }


  getUserPosts(): Observable<Postres> {
    return this.httpClient.get<Postres>(environment.baseURL + `users/664bcf3e33da217c4af21f00/posts?limit=10`);
  }


  updatePost(postId: string | null, body: object): Observable<any> {
    return this.httpClient.put(environment.baseURL + `posts/${postId}`, body);
  }




  deletePost(postId: string | null): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(environment.baseURL + `posts/${postId}`);
  }




}
