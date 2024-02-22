import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Injector } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private injector: Injector,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq);
      }
      return next.handle(req);
    }
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const authToken = this.authService.getToken();

  //   const authReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   });

  //   return next.handle(authReq).pipe(
  //     tap(
  //       event => {
  //         if (event instanceof HttpResponse) {
  //           console.log('Request:', authReq);
  //           console.log('Response:', event);
  //         }
  //       },
  //       error => {
  //         console.error('Error:', error);
  //       }
  //     )
  //   );
  // }
}
