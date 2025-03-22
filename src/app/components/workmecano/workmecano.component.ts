import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { formatDate } from '@angular/common';
import { CommonModule } from '@angular/common';
interface WorkMecano {
  namework: string;
  idmecano: string;
  mecano: string;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  estimatedMin: number;
  quantity: number;
}
@Component({
  selector: 'app-workmecano',
  imports: [TableModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './workmecano.component.html',
  styleUrl: './workmecano.component.css',
  standalone: true,
})
export class WorkmecanoComponent implements OnInit {
  worktodo!: WorkMecano[];
  ngOnInit(): void {
    this.worktodo = [
      {
        namework: 'Réparation moteur',
        idmecano: 'MEC001',
        mecano: 'Jean Dupont',
        startDate: new Date('2025-03-20T08:00:00'),
        endDate: null,
        status: 'en attente',
        estimatedMin: 120,
        quantity: 1,
      },
      {
        namework: 'Révision des freins',
        idmecano: 'MEC002',
        mecano: 'Pierre Martin',
        startDate: new Date('2025-03-19T09:00:00'),
        endDate: new Date('2025-03-19T12:00:00'),
        status: 'completed',
        estimatedMin: 90,
        quantity: 2,
      },
      {
        namework: 'Changement des pneus',
        idmecano: 'MEC003',
        mecano: 'Lucie Bernard',
        startDate: new Date('2025-03-22T14:00:00'),
        endDate: null,
        status: 'in-progress',
        estimatedMin: 60,
        quantity: 4,
      },
      {
        namework: 'Changement de l’huile',
        idmecano: 'MEC004',
        mecano: 'Alexandre Lefevre',
        startDate: new Date('2025-03-21T11:00:00'),
        endDate: new Date('2025-03-21T12:00:00'),
        status: 'completed',
        estimatedMin: 30,
        quantity: 3,
      },
      {
        namework: 'Réparation de la climatisation',
        idmecano: 'MEC005',
        mecano: 'Sophie Leclerc',
        startDate: new Date('2025-03-20T10:00:00'),
        endDate: null,
        status: 'en attente',
        estimatedMin: 150,
        quantity: 1,
      },
      {
        namework: 'Vérification des systèmes électroniques',
        idmecano: 'MEC006',
        mecano: 'Thomas Durand',
        startDate: new Date('2025-03-18T08:30:00'),
        endDate: new Date('2025-03-18T09:30:00'),
        status: 'completed',
        estimatedMin: 45,
        quantity: 5,
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
  getFormattedDate(date: Date) {
    formatDate(date, 'yyyy-MM-dd HH:mm:ss', 'en-US');
  }
}
