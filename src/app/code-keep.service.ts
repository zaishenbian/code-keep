import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CodeKeepService {

  public baseUrl: string = '/codekeepApi'

  public httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  constructor(private http: HttpClient) { }

  // 获取代码块目录
  getSiderBar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalog`)
  }
  // 新增目录
  createFolder(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/catalog`, {name: name}, this.httpOptions)
  }
}
