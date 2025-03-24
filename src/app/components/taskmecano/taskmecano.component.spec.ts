import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmecanoComponent } from './taskmecano.component';

describe('TaskmecanoComponent', () => {
  let component: TaskmecanoComponent;
  let fixture: ComponentFixture<TaskmecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskmecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskmecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
