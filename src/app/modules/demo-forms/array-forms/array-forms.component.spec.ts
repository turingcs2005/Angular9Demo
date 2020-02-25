import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayFormsComponent } from './array-forms.component';

describe('ArrayFormsComponent', () => {
  let component: ArrayFormsComponent;
  let fixture: ComponentFixture<ArrayFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
