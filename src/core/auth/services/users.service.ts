import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Userres } from '../../layout/mainlayout/navbar/models/userres.interface';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);


  signUp(body: object): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(environment.baseURL + 'users/signup', body);
  }


  signIn(body: object): Observable<{ message: string, token: string }> {
    return this.httpClient.post<{ message: string, token: string }>(environment.baseURL + 'users/signin', body);
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }


  changePassword(body: object): Observable<{ message: string, token: string }> {
    return this.httpClient.patch<{ message: string, token: string }>(environment.baseURL + 'users/change-password', body)
  }


  uploadProfilePhote(body: object): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(environment.baseURL + 'users/upload-photo', body)
  }


  getLoggedUserData(): Observable<Userres> {
    return this.httpClient.get<Userres>(environment.baseURL + 'users/profile-data');
  }

  decodeToken(): { user:string , iat:string  } | null {
    try {
      return jwtDecode(localStorage.getItem('token')!)
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}



