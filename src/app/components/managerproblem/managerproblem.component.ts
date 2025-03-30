import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import instanceAxios from '../../api/axios-config';
import { Problem } from '../../interface/Problem';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { InvoicemanagerComponent } from '../invoicemanager/invoicemanager.component';
import { getInitials } from '../../func/global.function';
@Component({
  selector: 'app-managerproblem',
  imports: [
    PanelModule,
    ButtonModule,
    AvatarModule,
    CommonModule,
    SkeletonModule,
    InvoicemanagerComponent,
  ],
  templateUrl: './managerproblem.component.html',
  styleUrl: './managerproblem.component.css',
})
export class ManagerproblemComponent {
  problem: Problem | undefined;
  constructor(private queryClient: QueryClient, private router: Router) {}
  getInitialName(name: string) {
    return getInitials(name);
  }
  ongetDevis(problem: Problem) {
    this.problem = problem;
  }
  onusegetProblem(): Problem[] {
    const reponse = this.usegetProblem.data().data;
    return reponse;
  }
  onErrorgetProblem() {
    const error = this.usegetProblem.isError();
    return error;
  }
  onLoadinggetProblem() {
    return this.usegetProblem.isPending();
  }
  async getProblem() {
    try {
      const response = await instanceAxios.get('/manager/get_all_problem', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetProblem = injectQuery(() => ({
    queryKey: ['requestproblem', localStorage.getItem('token')],
    queryFn: this.getProblem,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));
}
