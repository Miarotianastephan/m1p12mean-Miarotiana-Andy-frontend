import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { Repair } from '../../interface/Repair';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import instanceAxios from '../../api/axios-config';
import { Quote } from '../../interface/Devis';
import { Problem } from '../../interface/Problem';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
interface version {
  version: string;
  code: string;
}
@Component({
  selector: 'app-invoice',
  imports: [
    TagModule,
    SkeletonModule,
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
export class InvoiceComponent implements OnChanges {
  constructor(private queryClient: QueryClient, private router: Router) {}
  @Input() problem!: Problem;
  todo!: Repair[];
  selectedDevis: Quote | undefined;
  visible: boolean = false;
  visible_modal: boolean = false;
  commentaire: string = '';
  ngOnChanges(changes: SimpleChanges) {
    if (changes['problem'] && this.problem) {
      this.selectedDevis = undefined;
      this.usegetDevisByProblem.refetch();
    }
  }
  showDialog() {
    this.visible_modal = true;
  }
  onErrorgetDevisByProblem() {
    const error = this.usegetDevisByProblem.isError();
    return error;
  }
  onLoadinggetDevisByProblem() {
    return this.usegetDevisByProblem.isPending();
  }
  onUsegetDevisByProblem(): Quote[] {
    const data = this.usegetDevisByProblem.data().devis;
    return data;
  }
  async getDevisByProblem() {
    try {
      const response = await instanceAxios.get('/client/get_devisbyproblem', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { problem_id: this.problem._id },
      });
      console.log('reponse', response.data, this.problem._id);
      return response.data;
    } catch (error) {
      console.log(error);
      this.router.navigate(['/']);
    }
  }

  usegetDevisByProblem = injectQuery(() => {
    console.log(this.problem._id);
    return {
      queryKey: [
        'devisbyproblem',
        this.problem._id,
        localStorage.getItem('token'),
      ],
      queryFn: this.getDevisByProblem.bind(this),
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    };
  });
}
