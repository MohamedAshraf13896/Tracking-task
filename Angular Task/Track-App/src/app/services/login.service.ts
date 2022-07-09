import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private LoginService:HttpClient) { }
  BaseURl = "http://localhost:48755/api/Account/login"
  Login(User :any){
    return this.LoginService.post(this.BaseURl, User);
  }
}
