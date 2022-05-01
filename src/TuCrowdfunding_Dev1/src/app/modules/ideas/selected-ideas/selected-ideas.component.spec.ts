import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedIdeasComponent } from './selected-ideas.component';

describe('SelectedIdeasComponent', () => {
  let component: SelectedIdeasComponent;
  let fixture: ComponentFixture<SelectedIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedIdeasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
