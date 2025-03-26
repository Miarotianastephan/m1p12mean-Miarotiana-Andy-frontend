import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
interface Column {
  field: string;
  header: string;
}
interface Repair {
  cost: number;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  progres: number;
}
interface Work {
  name: string;
  cost: number;
  status: string;
  quantity: number;
  startDate: Date | null;
  endDate: Date | null;
  estimatedMin: number;
}
interface Mecaniciens {
  name: string;
  contact: string;
}
@Component({
  selector: 'app-repair',
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    ProgressBarModule,
    TagModule,
    ButtonModule,
    AvatarModule,
    PanelModule,
  ],
  templateUrl: './repair.component.html',
  styleUrl: './repair.component.css',
  standalone: true,
})
export class RepairComponent implements OnInit {
  repairHistory!: Repair[];
  work!: Work[];
  cols!: Column[];
  mecano!: Mecaniciens[];
  ngOnInit() {
    this.mecano = [
      {
        name: 'Andy Rakotonavalona',
        contact: '0347860252',
      },
      {
        name: 'Anko Rakotonavalona',
        contact: '03255157989',
      },
    ];
    this.cols = [
      { field: 'cost', header: 'Coût' },
      { field: 'startDate', header: 'Date de début' },
      { field: 'endDate', header: 'Date de fin' },
      { field: 'status', header: 'Statut' },
      { field: 'progres', header: 'Progression' },
      { field: '', header: '' },
    ];
    this.repairHistory = [
      {
        cost: 500000,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-05'),
        status: 'completed',
        progres: 100,
      },
      {
        cost: 100000,
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-03-15'),
        status: 'completed',
        progres: 100,
      },
      {
        cost: 1500000,
        startDate: new Date('2024-03-20'),
        endDate: null,
        status: 'in-progress',
        progres: 60,
      },
      {
        cost: 1500000,
        startDate: new Date('2024-03-28'),
        endDate: null,
        status: 'in-progress',
        progres: 30,
      },
    ];
    this.work = [
      {
        name: "Changement d'huile",
        cost: 50,
        status: 'en attente',
        quantity: 1,
        startDate: null,
        endDate: null,
        estimatedMin: 30,
      },
      {
        name: 'Réparation moteur',
        cost: 300,
        status: 'in-progress',
        quantity: 1,
        startDate: new Date('2024-03-05'),
        endDate: null,
        estimatedMin: 120,
      },
      {
        name: 'Changement des pneus',
        cost: 150,
        status: 'completed',
        quantity: 4,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-02-16'),
        estimatedMin: 60,
      },
      {
        name: 'Réparation suspension',
        cost: 200,
        status: 'en attente',
        quantity: 1,
        startDate: null,
        endDate: null,
        estimatedMin: 90,
      },
      {
        name: 'Révision générale',
        cost: 120,
        status: 'in-progress',
        quantity: 1,
        startDate: new Date('2024-03-03'),
        endDate: null,
        estimatedMin: 90,
      },
      {
        name: 'Changement de filtre à air',
        cost: 12000,
        status: 'completed',
        quantity: 1,
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-01-20'),
        estimatedMin: 30,
      },
    ];
  }
  getColorTag(status: string) {
    if (status === 'in-progress') {
      return 'warn';
    } else if (status === 'en attente') {
      return 'secondary';
    } else {
      return 'success';
    }
  }
}
