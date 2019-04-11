import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CodeKeepService {

  public baseUrl: string = '/codekeepApi'

  public codeEmitter: EventEmitter<any> = new EventEmitter()

  constructor(private http: HttpClient) { }

  // 获取代码块目录
  getSiderBar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalog`)
  }
  // 新增目录
  createFolder(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/catalog`, {name: name})
  }
  // 新增代码块
  createCode(name: string, pid: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/code`, { name: name, pid: pid })
  }
  // 查询代码块
  getCode(codeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/code/${codeId}`)
  }
  // 删除代码块
  delCode(pid: string, codeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/code/${pid}/${codeId}`)
  }
  // 更新代码块
  updateCode(codeId: string, code: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/code/${codeId}`, code)
  }
  // 代码块名称唯一性校验
  uniqueName(name: string, codeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/uniqueName`, { name: name, codeId: codeId })
  }

  setCodeEmitter(code: any = { name: '', description: '', content: '' }) {
    this.codeEmitter.emit(code)
  }
  getCodeEmitter() {
    return this.codeEmitter
  }
}
