import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  public codeEditorForm: FormGroup

  constructor(private fb: FormBuilder) { 
    this.codeEditorForm = this.fb.group({
      codeName: ['', [Validators.required], [this.codeNameAsyncValidator]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]]
    })
  }

  ngOnInit() { }

  submitForm($event: any, value: any) {
    $event.preventDefault()
    for (const key in this.codeEditorForm.controls) {
      this.codeEditorForm.controls[key].markAsDirty();
      this.codeEditorForm.controls[key].updateValueAndValidity();
    }
    console.log(value)
  }

  codeNameAsyncValidator(control: FormControl) {
    Observable.create((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })
  }

}
