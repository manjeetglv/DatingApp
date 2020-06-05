import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error =>{
      if(error.status === 401){
        return throwError(error.statusText);
      }
      if(error instanceof HttpErrorResponse) {
        // Application errors 500 type of errors
        const applicationError = error.headers.get('Application-Error');
        if(applicationError){
          return throwError(applicationError);
        }

        const serverError = error.error;
        // Model state errors
        let modalStateErrors = '';
        if(serverError.errors && typeof serverError.errors === 'object'){
          for (const key in serverError.errors){
            if(serverError.errors[key]){
                modalStateErrors += serverError.errors[key] + '\n';
            }
          }
        }
        return throwError(modalStateErrors || serverError || 'Server Error');
      }
    }));
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}