import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InvoiceComponent } from '../invoice/invoice.component';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
interface voiture {
  voiture: string;
  code: string;
}
@Component({
  selector: 'app-quote',
  imports: [
    PanelModule,
    ButtonModule,
    AvatarModule,
    InvoiceComponent,
    DialogModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
  ],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
})
export class QuoteComponent implements OnInit {
  visible: boolean = false;
  devis: string = '';
  voiture!: voiture[];
  selectedvoiture: voiture | undefined;
  ngOnInit(): void {
    this.voiture = [
      { voiture: 'LAMBORGHINI URUS', code: 'NY' },
      { voiture: 'MAZDA', code: 'RM' },
    ];
  }
  showDialog() {
    this.visible = true;
  }
}
