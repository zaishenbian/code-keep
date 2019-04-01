import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeKeepLayoutComponent } from './code-keep-layout.component';

describe('CodeKeepLayoutComponent', () => {
  let component: CodeKeepLayoutComponent;
  let fixture: ComponentFixture<CodeKeepLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeKeepLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeKeepLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
