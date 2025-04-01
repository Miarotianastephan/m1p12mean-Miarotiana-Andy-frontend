import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientremorquageComponent } from './clientremorquage.component';

describe('ClientremorquageComponent', () => {
  let component: ClientremorquageComponent;
  let fixture: ComponentFixture<ClientremorquageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientremorquageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientremorquageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
