import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarusersComponent } from './carusers.component';

describe('CarusersComponent', () => {
  let component: CarusersComponent;
  let fixture: ComponentFixture<CarusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarusersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
