import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/model/UserDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  HOST : string = environment.BASE_URL
  BASE_PATH = environment.BASE_PATH
  LOGIN_URL : string = this.HOST+this.BASE_PATH+'/login';
  REGISTER_URL : string = this.HOST+this.BASE_PATH+'/register';
  token !: string;
  loggedInUserName !: string;

  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  login(userDto: UserDTO):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(this.LOGIN_URL,userDto,{observe: 'response'});
  }

  register(userDto: UserDTO):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(this.REGISTER_URL,userDto,{observe: 'response'});
  }

  logOut():void{
    this.token = ''
    this.loggedInUserName = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('users')
  }

  saveToken(token: string): void{
    this.token = token
    localStorage.setItem('token',token)
  }

  addUserToCache(user:UserDTO):void{
    localStorage.setItem('user',JSON.stringify(user));
  }

  getUserFromCache():UserDTO{
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  loadToken():void{
    this.token = localStorage.getItem('token') || '';
  }

  getToken():string{
    return this.token;
  }

  isLoggedIn(): boolean{
    this.loadToken();
    if(this.token !== '' && (this.jwtHelper.decodeToken(this.token).sub !== null || '')){
      if(!this.jwtHelper.isTokenExpired(this.token)){
        this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
        return true;
      }
    }
    this.logOut()
    return false;
  }

}
