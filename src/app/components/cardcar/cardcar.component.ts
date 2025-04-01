import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Voiture } from '../../interface/Voiture';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-cardcar',
  imports: [
    RouterModule,
    CardModule,
    DividerModule,
    GalleriaModule,
    ImageModule,
    ButtonModule,
  ],
  templateUrl: './cardcar.component.html',
  styleUrl: './cardcar.component.css',
})
export class CardcarComponent {
  @Input() car!: Voiture;
}
