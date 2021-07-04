import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {

  }


  register(user){
    interface RegistrationResponse {
      success: false,
      message: string
    }
    return this._http.post<RegistrationResponse>("/users/registration", user);
  }

  login(user){


    interface LoginResponse {
      success: boolean,
      message: string,
      user: {
            name: string,
            email:string,
            id:number,
            token:string
          }
    }
    return this._http.post<LoginResponse>("/users/login", user);
  }

  saveUser(user){
    localStorage.setItem('AUTH_TOKEN', user.token);
    localStorage.setItem('USER', JSON.stringify(user));
  }

  isLoggedIn() :boolean{
    return !!localStorage.getItem('AUTH_TOKEN');
  }

  logout(){
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER');
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('USER'));
  }
}
