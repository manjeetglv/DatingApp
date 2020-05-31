import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactiveBuilderFormComponent } from './login-reactive-builder-form.component';

describe('LoginReactiveBuilderFormComponent', () => {
  let component: LoginReactiveBuilderFormComponent;
  let fixture: ComponentFixture<LoginReactiveBuilderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginReactiveBuilderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginReactiveBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
