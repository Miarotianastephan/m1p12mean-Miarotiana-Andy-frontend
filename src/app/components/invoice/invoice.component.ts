import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { TextareaModule } from 'primeng/textarea';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { DatePickerModule } from 'primeng/datepicker';
interface repair {
  name: string;
  description: string;
  cost: number;
  quantity?: number; // optionnel
  isQuantityRequired: boolean; // Indique si la quantité est requise pour cette réparation
}
interface version {
  version: string;
  code: string;
}
@Component({
  selector: 'app-invoice',
  imports: [
    TableModule,
    DividerModule,
    ButtonModule,
    SelectModule,
    CommonModule,
    FormsModule,
    FloatLabelModule,
    DrawerModule,
    TextareaModule,
    PanelModule,
    AvatarModule,
    DatePickerModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
  standalone: true,
})
export class InvoiceComponent implements OnInit {
  todo!: repair[];
  cities: version[] | undefined;
  selectedCity: version | undefined;
  visible: boolean = false;
  commentaire: string = '';
  selectedDateTime!: Date;
  existingAppointments: Date[] = [
    new Date(2024, 2, 20, 10, 0), // 20 Mars 2024 à 10h00
    new Date(2024, 2, 20, 14, 0), // 20 Mars 2024 à 14h00
    new Date(2024, 2, 21, 9, 0), // 21 Mars 2024 à 09h00
  ];
  disabledDays: Date[] = [];
  ngOnInit(): void {
    this.cities = [
      { version: 'V1', code: 'NY' },
      { version: 'V2', code: 'RM' },
    ];
    this.todo = [
      {
        name: 'Vidange',
        description: 'Vidange moteur',
        quantity: 1,
        cost: 50,
        isQuantityRequired: false,
      },
      {
        name: 'Remplacement de pneus',
        description: 'Remplacement de 4 pneus',
        quantity: 4,
        cost: 200,
        isQuantityRequired: true,
      },
      {
        name: 'Plaquettes de frein',
        description: 'Remplacement des plaquettes de frein',
        quantity: 4,
        cost: 150,
        isQuantityRequired: true,
      },
    ];
    // Ajouter les jours où toutes les heures sont prises
    const takenDays = this.existingAppointments.map((app) =>
      app.toDateString()
    );
    this.disabledDays = [...new Set(takenDays)].map((day) => new Date(day));
  }
  getDisabledTimes(): number[] {
    // Retourne les heures désactivées pour le jour sélectionné
    if (!this.selectedDateTime) return [];
    return this.existingAppointments
      .filter(
        (app) => app.toDateString() === this.selectedDateTime.toDateString()
      )
      .map((app) => app.getHours());
  }
}
