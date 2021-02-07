import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModElementComponent } from './mod-element.component';

describe('ModElementComponent', () => {
  let component: ModElementComponent;
  let fixture: ComponentFixture<ModElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
