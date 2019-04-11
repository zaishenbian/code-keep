import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class CodeKeepInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newBody = new HttpParams({
        fromObject: req.body
    })
    const httpOptions: any = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    const newReq = req.clone({ body: newBody, headers: httpOptions })
    return next.handle(newReq)
  }
}