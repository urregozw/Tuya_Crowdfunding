import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricGraphComponent } from './historic-graph.component';

describe('HistoricGraphComponent', () => {
  let component: HistoricGraphComponent;
  let fixture: ComponentFixture<HistoricGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
