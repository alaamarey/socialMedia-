import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { map, Observable } from 'rxjs';
import { Postres } from '../../shared/components/post/model/postres.interface';

export const postsResolver: ResolveFn<Observable<Postres>> = (route, state) => {

  const postsService = inject(PostsService);


  (postsService.getAllPosts().subscribe(res => {
  console.log(res);
  }))
  
  

  return postsService.getAllPosts().pipe( 
     map(  (response) => response ))
  };






