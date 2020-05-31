import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactiveFormComponent } from './login-reactive-form.component';

describe('LognReactiveFormComponent', () => {
  let component: LoginReactiveFormComponent;
  let fixture: ComponentFixture<LoginReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
