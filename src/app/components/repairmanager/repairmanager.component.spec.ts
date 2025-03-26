import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairmanagerComponent } from './repairmanager.component';

describe('RepairmanagerComponent', () => {
  let component: RepairmanagerComponent;
  let fixture: ComponentFixture<RepairmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
