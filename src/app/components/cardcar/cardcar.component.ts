import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cardcar',
  imports: [
    RouterModule,
    CardModule,
    DividerModule,
    GalleriaModule,
    ButtonModule,
  ],
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
