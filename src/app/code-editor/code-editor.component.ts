import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { CodeKeepService } from '../code-keep.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  public codeEditorForm: FormGroup

  public codeId: string

  public searchText$ = new Subject<any>()

  constructor(private fb: FormBuilder, private codekeep: CodeKeepService, private message: NzMessageService) {
    this.codeEditorForm = this.fb.group({
      name: ['', [Validators.required], [this.codeNameAsyncValidator]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getCode()
    this.validateCodeName()
  }

  getCode() {
    this.codekeep.getCodeEmitter().subscribe(code => {
      this.codeId = code._id
      this.updateEditorForm(code)
    })
  }

  updateEditorForm(code) {
    this.codeEditorForm.patchValue({
      name: code.name,
      description: code.description,
      content: code.content
    })
    for (const key in this.codeEditorForm.controls) {
      this.codeEditorForm.controls[key].markAsPristine();
    }
  }

  submitForm($event: any, value: any) {
    $event.preventDefault()
    // for (const key in this.codeEditorForm.controls) {
    //   this.codeEditorForm.controls[key].markAsDirty();
    //   this.codeEditorForm.controls[key].updateValueAndValidity();
    // }
    this.codekeep.updateCode(this.codeId, value).subscribe(res => {
      if (res.code === 0) {
        this.message.create('success', '更新代码块成功')
      } else {
        this.message.create('error', res.message)
      }
    })
  }

  codeNameAsyncValidator = (control: FormControl) =>
    Observable.create((observer: Observer<ValidationErrors | null>) => {
      this.searchText$.next({ control, observer })
      console.log(12)
    })

  validateCodeName() {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(({ control, observer }) => {
      this.codekeep.uniqueName(control.value, this.codeId).subscribe(res => {
        if (res.code === 1) {
          observer.next({ error: true, duplicated: true })
        } else {
          observer.next(null)
        }
        observer.complete()
      })
    })
  }

}
