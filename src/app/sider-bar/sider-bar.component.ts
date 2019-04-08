import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CodeKeepService } from '../code-keep.service';

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

  public items: MenuItem[] = [
    {
      label: 'test1',
      value: '1',
      children: [
        {
          label: 'test1-1',
          value: '1-1'
        },
        {
          label: 'test1-2',
          value: '1-2'
        }
      ]
    },
    {
      label: 'test2',
      value: '2',
      children: [
        {
          label: 'test2-1',
          value: '2-1'
        },
        {
          label: 'test2-2',
          value: '2-2'
        }
      ]
    },
    {
      label: 'test3',
      value: '3',
      children: [
        {
          label: 'test3-1',
          value: '3-1'
        },
        {
          label: 'test3-2',
          value: '3-2'
        }
      ]
    },
    {
      label: 'test4',
      value: '4',
      children: [
        {
          label: 'test4-1',
          value: '4-1'
        },
        {
          label: 'test4-2',
          value: '4-2'
        }
      ]
    },
  ]

  constructor(private codekeep: CodeKeepService) { }

  ngOnInit() {
    this.initCtxMenu()
    this.getSiderBar()
  }

  // 获取左侧目录
  getSiderBar() {
    this.codekeep.getSiderBar().subscribe(res => {
      console.log('目录', res)
    })
  }

  contextMenu(type, i) {
    this.contextMenuType = type
    // 阻止默认右键菜单的弹出
    event.preventDefault()
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
    if (data.type === 'add') {
      this.addCode()
    } else if (data.type === 'del') {
      this.delCode()
    }
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
