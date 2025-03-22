import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmecanoComponent } from './workmecano.component';

describe('WorkmecanoComponent', () => {
  let component: WorkmecanoComponent;
  let fixture: ComponentFixture<WorkmecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkmecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkmecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
