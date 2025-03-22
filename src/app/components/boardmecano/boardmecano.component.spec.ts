import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmecanoComponent } from './boardmecano.component';

describe('BoardmecanoComponent', () => {
  let component: BoardmecanoComponent;
  let fixture: ComponentFixture<BoardmecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardmecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardmecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
