import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/model/UserDTO';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/User';
import { CustomHttpResponse } from 'src/app/model/CustomHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  HOST : string = environment.BASE_URL
  BASE_PATH = environment.BASE_PATH
  GET_USERS_URL : string = this.HOST+this.BASE_PATH+'/list';
  ADD_USER_URL : string = this.HOST+this.BASE_PATH+'/add';
  UPDATE_USER_URL : string = this.HOST+this.BASE_PATH+'/update';
  RESET_PSWD_URL : string = this.HOST+this.BASE_PATH+'/resetPassword';
  UPDT_PFL_IMG_URL : string = this.HOST+this.BASE_PATH+'/updateProfileImage';

  constructor(private http:HttpClient) { }

  getUsers():Observable<HttpResponse<User[]> | HttpErrorResponse>{
    return this.http.get<HttpResponse<User[]> | HttpErrorResponse>(this.GET_USERS_URL)
  }

  addUser(formData:FormData):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(this.ADD_USER_URL, formData)
  }

  updateUser(formData:FormData):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(this.UPDATE_USER_URL, formData)
  }

  deleteUser(userId:Number):Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.delete<CustomHttpResponse>(this.UPDATE_USER_URL+"/"+ userId)
  }

  resetPassword(email:string):Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(this.RESET_PSWD_URL+"/"+email)
  }

  updateProfileImage(formData:FormData):Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(this.UPDT_PFL_IMG_URL, formData, 
      {
        reportProgress:true,
        observe:'events'
      })
  }

  addUsersToCache(userList:User[]):void{
    localStorage.setItem('users',JSON.stringify(userList))
  }

  getUsersFromCache():User[]{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users') ||  '')
    }
    return new Array<User>();
  }

  createFormData(loggedInUsername:string, user: User, profileImage: File): FormData{
    const formData = new FormData();
    formData.append('currentUsername',loggedInUsername)
    formData.append('firstName',user.firstName)
    formData.append('lastName',user.lastName)
    formData.append('username',user.username)
    formData.append('email',user.email)
    formData.append('role',user.role)
    formData.append('isActive',JSON.stringify(user.isActive))
    formData.append('isNonLocked',JSON.stringify(user.isNotLocked))
    formData.append('profileImage',profileImage)
    return formData;
  }
}
