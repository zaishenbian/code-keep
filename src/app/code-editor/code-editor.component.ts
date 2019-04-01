import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  public code: String;

  constructor() { }

  ngOnInit() {
    this.code = 'let test = "test"'
  }

}
