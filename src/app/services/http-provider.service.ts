import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpProviderService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dup = req.clone({setHeaders: {'Content-Type': 'application/json'}});
    return next.handle(dup);
  }

}
