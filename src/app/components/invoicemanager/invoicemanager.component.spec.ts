import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicemanagerComponent } from './invoicemanager.component';

describe('InvoicemanagerComponent', () => {
  let component: InvoicemanagerComponent;
  let fixture: ComponentFixture<InvoicemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicemanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
