import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnapprovedComponent } from './list-unapproved.component';

describe('ListUnapprovedComponent', () => {
  let component: ListUnapprovedComponent;
  let fixture: ComponentFixture<ListUnapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUnapprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
