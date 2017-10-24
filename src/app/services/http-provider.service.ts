import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpProviderService implements HttpInterceptor {

  private cache = {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dup = req.clone({setHeaders: {'Content-Type': 'application/json'}});

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache[req.urlWithParams] || null;
    if (cachedResponse) {
      return Observable.of(cachedResponse);
    }

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
      	this.cache[req.urlWithParams] = event;
      }
    });

    //return next.handle(dup);
  }

}
