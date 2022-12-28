import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(HttpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(HttpRequest.url.includes(this.authService.LOGIN_URL))
      return httpHandler.handle(HttpRequest);

    if(HttpRequest.url.includes(this.authService.REGISTER_URL))
      return httpHandler.handle(HttpRequest);  
      
    if(HttpRequest.url.includes('/resetPassword'))
      return httpHandler.handle(HttpRequest); 

    this.authService.loadToken()

    const JWT_TOKEN = this.authService.getToken();
    // cloning request as requests are immutable 
    const REQUEST_CLONE = HttpRequest.clone({
      setHeaders: { Authorizaton: `Bearer ${JWT_TOKEN}`}
    })
    return httpHandler.handle(REQUEST_CLONE)
  }
}
