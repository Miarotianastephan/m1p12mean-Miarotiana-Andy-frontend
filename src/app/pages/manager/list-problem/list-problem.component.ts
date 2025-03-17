import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProblemReportService } from '../../../services/problem/problem-report.service';
import { ProblemReport } from '../../../model/problem-report.model';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-list-problem',
  imports: [CommonModule ,TableModule, ToastModule, CardModule, ButtonModule, CarouselModule],
  providers: [MessageService, ProblemReportService],
  templateUrl: './list-problem.component.html',
  styleUrl: './list-problem.component.css'
})
export class ListProblemComponent implements OnInit{
  problemReports!: ProblemReport[];

  selectedProblem!: ProblemReport;

  constructor(private problemReportService: ProblemReportService, private messageService: MessageService) {}

  ngOnInit() {
    this.problemReportService.getProblemReports().subscribe({
      next: (data) => {
        this.problemReports = data;
        console.log('Données reçues :', data);
      },
      error: (err) => console.error('Erreur lors de la récupération des rapports de problèmes :', err)
    });
  }

  onRowSelect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Description du probleme', detail: event.data.description });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Focus annulee', detail: event.data.description });
  }
}
