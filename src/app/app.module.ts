import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeKeepLayoutComponent } from './code-keep-layout/code-keep-layout.component';
import { SiderBarComponent } from './sider-bar/sider-bar.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FocusDirective } from './common-directive/focus.directive';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    CodeKeepLayoutComponent,
    SiderBarComponent,
    ContextMenuComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CovalentCodeEditorModule,
    FormsModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
