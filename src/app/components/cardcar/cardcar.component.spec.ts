import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcarComponent } from './cardcar.component';

describe('CardcarComponent', () => {
  let component: CardcarComponent;
  let fixture: ComponentFixture<CardcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardcarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
