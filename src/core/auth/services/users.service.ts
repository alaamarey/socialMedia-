import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Userres } from '../../layout/mainlayout/navbar/models/userres.interface';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { API_URL } from '../../../token/token_ApI_URL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private readonly httpClient = inject(HttpClient);
  private readonly API_URL = inject(API_URL);
  private readonly router = inject(Router);


  signUp(body: object): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.API_URL + 'users/signup', body);
  }


  signIn(body: object): Observable<{ message: string, token: string }> {
    return this.httpClient.post<{ message: string, token: string }>(this.API_URL + 'users/signin', body);
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }


  changePassword(body: object): Observable<{ message: string, token: string }> {
    return this.httpClient.patch<{ message: string, token: string }>(this.API_URL + 'users/change-password', body)
  }


  uploadProfilePhote(body: object): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(this.API_URL + 'users/upload-photo', body)
  }


  getLoggedUserData(): Observable<Userres> {
    return this.httpClient.get<Userres>(this.API_URL + 'users/profile-data');
  }

  decodeToken(): { user: string, iat: string } | null {
    try {
      return jwtDecode(localStorage.getItem('token')!)
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}



