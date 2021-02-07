import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpCallsComponent } from './http-calls.component';

describe('HttpCallsComponent', () => {
  let component: HttpCallsComponent;
  let fixture: ComponentFixture<HttpCallsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
