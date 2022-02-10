import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private contentType : any;
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      const idToken = localStorage.getItem("id_token");
      if (req.headers.has('Content-Type'))
        this.contentType = req.headers.get('Content-Type');

      if (idToken) {
        const cloned = req.clone({
          setHeaders: {
            "Authorization" : `Bearer ${idToken}`,
            "Content-Type" : (this.contentType != 'application/json' ? 'application/text' :  this.contentType)
          }
        });
        return next.handle(cloned)
      }
      else {
        return next.handle(req);
      }
    }
}
