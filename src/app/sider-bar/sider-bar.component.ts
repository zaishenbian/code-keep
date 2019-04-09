import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CodeKeepService } from '../code-keep.service';
import { NzMessageService } from 'ng-zorro-antd';

interface MenuItem {
  label: string,
  value: string,
  open?: boolean,
  editing?: boolean,
  children?: MenuItem[]
}

declare var event: MouseEvent;

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {

  @ViewChild('ctxMenu') ctxMenu: ElementRef

  public folderIndex: number

  public codeIndex: number[]

  public contextMenuType: string

  public items: MenuItem[]

  constructor(private codekeep: CodeKeepService, private message: NzMessageService) { }

  ngOnInit() {
    this.initCtxMenu()
    this.getSiderBar()
  }

  // 获取左侧目录
  getSiderBar() {
    this.codekeep.getSiderBar().subscribe(res => {
      console.log('目录', res)
      if (res.code === 0) {
        this.items = res.data
      } else {
        this.message.create('error', res.message)
      }
    })
  }

  contextMenu(type, i) {
    this.contextMenuType = type
    // 阻止默认右键菜单的弹出
    event.preventDefault()
    // 阻止冒泡
    event.stopPropagation()
    let left = event.clientX
    let top = event.clientY
    this.showCtxMenu(left, top)
    if (type === 'folder') {
      this.folderIndex = i
    } else if (type === 'code') {
      this.codeIndex = i
    }
  }

  operateCode(data) {
    if (data.type === 'addCode') {
      this.addCode()
    } else if (data.type === 'addFolder') {
      this.addFolder()
    } else if (data.type === 'del') {
      this.delCode()
    }
  }

  addFolder() {
    this.items.push({
      label: '',
      value: '',
      editing: true,
      children: []
    })
  }

  addCode() {
    this.items[this.folderIndex].open = true
    this.items[this.folderIndex].children.push({
      label: '',
      value: '',
      editing: true
    })
  }

  delCode() {
    let fir = this.codeIndex[0]
    let sec = this.codeIndex[1]
    this.items[fir].children.splice(sec, 1)
  }

  createFolder(node, location) {
    if (node.label === '') {
      this.items.splice(location, 1)
    } else {
      this.codekeep.createFolder(node.label).subscribe(res => {
        if (res.code === 0) {
          this.message.create('success', '新增目录成功')
          delete node.editing
        } else {
          this.message.create('error', res.message)
        }
      })
    }
  }

  createCode(node, location) {
    if (node.label === '') {
      let fir = location[0]
      let sec = location[1]
      this.items[fir].children.splice(sec, 1)
    } else {
      delete node.editing
    }
  }

  getCode(codeId) {
    console.log(codeId)
  }

  initCtxMenu() {
    document.body.addEventListener('click', () => {
      this.hideCtxMenu()
    })
  }

  showCtxMenu(x, y) {
    let ctxMenu = this.ctxMenu.nativeElement
    document.body.append(ctxMenu)
    ctxMenu.style.cssText = `
      display: block;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    `
  }

  hideCtxMenu() {
    let ctxMenu = document.querySelector('body>.ctxMenu')
    if (ctxMenu) {
      document.body.removeChild(ctxMenu)
      this.folderIndex = null
    }
  }

}
