import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { map, Observable } from 'rxjs';
import { Post, Postres } from '../../shared/components/post/model/postres.interface';

export const profilepostsResolver: ResolveFn<Post[]> = (route, state) => {
  

  const postsService = inject(PostsService);
  return postsService.getUserPosts().pipe(  
    map(function (response) {
      console.log( response);
         return response.posts; 
    } )
  ); 
 
};
