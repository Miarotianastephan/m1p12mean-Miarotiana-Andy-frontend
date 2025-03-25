import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerproblemComponent } from './managerproblem.component';

describe('ManagerproblemComponent', () => {
  let component: ManagerproblemComponent;
  let fixture: ComponentFixture<ManagerproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerproblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
