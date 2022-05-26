import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedIdeaByLinkComponent } from './selected-ideas.component';

describe('SelectedIdeaByLinkComponent', () => {
  let component: SelectedIdeaByLinkComponent;
  let fixture: ComponentFixture<SelectedIdeaByLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedIdeaByLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedIdeaByLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
