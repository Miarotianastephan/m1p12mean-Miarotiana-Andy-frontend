import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { Repair } from '../../interface/Repair';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';
import instanceAxios from '../../api/axios-config';
import { Parts } from '../../interface/Parts';
import { SubService } from '../../interface/SubService';
import { Problem } from '../../interface/Problem';
import { SubCategory } from '../../model/subcategory-service.model';
import { Quote } from '../../interface/Devis';

@Component({
  selector: 'app-invoicemanager',
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
    TagModule,
    DialogModule,
    InputText,
    SkeletonModule,
  ],
  templateUrl: './invoicemanager.component.html',
  styleUrl: './invoicemanager.component.css',
  standalone: true,
})
export class InvoicemanagerComponent implements OnChanges {
  constructor(private queryClient: QueryClient, private router: Router) {}
  @Input() problem!: Problem;
  todo!: Repair[];
  selectedDevis: Quote | undefined;
  visible: boolean = false;
  visible_modal: boolean = false;
  commentaire: string = '';
  search_part: string = '';
  search_service: string = '';
  parts: Parts[] = [];
  services: SubService[] = [];
  parts_devis: Parts[] = [];
  services_devis: SubService[] = [];
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
      const response = await instanceAxios.get('/manager/get_devisbyproblem', {
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

  async CreateQuote(
    problem: Problem,
    part_devis: Parts[],
    services_devis: SubService[]
  ) {
    try {
      const body = { problem, part_devis, services_devis };
      const response = await instanceAxios.post('/manager/give_devis', body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetCreateQuote = injectMutation(() => ({
    mutationFn: (data: {
      problem: Problem;
      part_devis: Parts[];
      services_devis: SubService[];
    }) => this.CreateQuote(data.problem, data.part_devis, data.services_devis),
    onError() {
      console.error("Une erreur s'est produite lors de la création du devis.");
    },
    onSuccess() {
      console.log('Le devis a été créé avec succès.');
    },
  }));

  async onusegetCreateQuote() {
    const problem = this.problem;
    const part = this.parts_devis;
    const service = this.services_devis;
    const reponse = await this.usegetCreateQuote.mutateAsync({
      problem: problem!,
      part_devis: part,
      services_devis: service,
    });
    if (reponse.success === true) {
      this.parts_devis = [];
      this.services_devis = [];
      this.visible_modal = false;
    }
  }

  addPartToDevis(part: Parts) {
    const exists = this.parts_devis.some((p) => p._id === part._id);
    if (!exists) {
      part.quantite_devis = 1;
      this.parts_devis.push(part);
    }
  }

  addServiceToDevis(service: SubService) {
    const exists = this.services_devis.some((p) => p._id === service._id);
    if (!exists) {
      service.quantite_service = 1;
      this.services_devis.push(service);
    }
  }
  async onusegetSearchPart() {
    const search_p = this.search_part;
    const reponse = await this.usegetSearchPart.mutateAsync(search_p);
    this.parts = reponse.data;
  }
  onLoadinggetSearchPart() {
    return this.usegetSearchPart.isPending();
  }
  onErrorgetSearchPart() {
    return this.usegetSearchPart.isError();
  }
  async getSearchPart(search: string) {
    try {
      const response = await instanceAxios.get('/manager/search_parts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { search: search },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetSearchPart = injectMutation(() => ({
    mutationFn: (search: string) => this.getSearchPart(search),
    onError() {},
    onSuccess() {},
  }));

  async onusegetSearchService() {
    const search_p = this.search_service;
    const reponse = await this.usegetSearchService.mutateAsync(search_p);
    this.services = reponse.data;
  }
  onLoadinggetSearchService() {
    return this.usegetSearchService.isPending();
  }
  onErrorgetSearchService() {
    return this.usegetSearchService.isError();
  }

  async getSearchService(search: string) {
    try {
      const response = await instanceAxios.get('/manager/search_service', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { search: search },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }
  usegetSearchService = injectMutation(() => ({
    mutationFn: (search: string) => this.getSearchService(search),
    onError() {},
    onSuccess() {},
  }));
}
