import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commentres , Comment} from '../components/post/components/createcomment/models/commentres.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {




  private readonly httpClient = inject(HttpClient);


  comments = signal<Comment[]>([]); 







  createComment(body: object): Observable<Commentres> {
    return this.httpClient.post<Commentres>(environment.baseURL + 'comments', body);
  }











  

  updateComment( commentId  : string , body: object   ): Observable<{message:string , comment :Comment}  > {
    return this.httpClient.put<{message:string , comment :Comment}>(environment.baseURL + `comments/${commentId}`, body); 
  } 


  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(environment.baseURL + `comments/${commentId}`);
  }




  getPostComment(postId :string): Observable<any> {
    return this.httpClient.get( environment.baseURL + `posts/${postId}/comments` )
  }

}
