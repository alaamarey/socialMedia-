import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../shared/components/post/model/postres.interface';
import { PostsService } from '../../shared/services/posts.service';

export const postdetailsResolver: ResolveFn<Observable<Post>> = (route, state) => {


  const postsService = inject(PostsService);
  const postId = route.paramMap.get('postId');



  return postsService.getSinglePost(postId).pipe(
    map(response => response.post)
  );


};
