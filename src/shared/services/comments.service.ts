import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commentres, Comment } from '../components/post/components/createcomment/models/commentres.interface';
import { API_URL } from '../../token/token_ApI_URL';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {




  private readonly httpClient = inject(HttpClient);
  private readonly API_URL = inject(API_URL);


  comments = signal<Comment[]>([]);







  createComment(body: object): Observable<Commentres> {
    return this.httpClient.post<Commentres>(this.API_URL + 'comments', body);
  }













  updateComment(commentId: string, body: object): Observable<{ message: string, comment: Comment }> {
    return this.httpClient.put<{ message: string, comment: Comment }>(this.API_URL + `comments/${commentId}`, body);
  }


  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(this.API_URL + `comments/${commentId}`);
  }




  getPostComment(postId: string): Observable<any> {
    return this.httpClient.get(this.API_URL + `posts/${postId}/comments`)
  }

}
