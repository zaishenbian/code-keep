import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Input() type: string

  @Output() operateCode = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
  }

  addCode() {
    this.operateCode.emit({ type: 'addCode' })
  }

  addFolder() {
    this.operateCode.emit({ type: 'addFolder'})
  }

  delCode() {
    this.operateCode.emit({ type: 'del' })
  }

}
