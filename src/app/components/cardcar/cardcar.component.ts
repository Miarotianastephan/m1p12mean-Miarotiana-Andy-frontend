import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
@Component({
  selector: 'app-cardcar',
  imports: [CardModule, DividerModule, GalleriaModule],
  templateUrl: './cardcar.component.html',
  styleUrl: './cardcar.component.css',
})
export class CardcarComponent {
  @Input() car!: {
    marque: string;
    model: string;
    kilometrage: number;
    annee: number;
    type: string;
    imageVoiture: string[];
  };
}
