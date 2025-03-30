import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InvoiceComponent } from '../invoice/invoice.component';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Voiture } from '../../interface/Voiture';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';
import instanceAxios from '../../api/axios-config';
import { Problem } from '../../interface/Problem';
import { getInitials } from '../../func/global.function';
@Component({
  selector: 'app-quote',
  imports: [
    PanelModule,
    ButtonModule,
    AvatarModule,
    InvoiceComponent,
    DialogModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
    CommonModule,
    SkeletonModule,
  ],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
  standalone: true,
})
export class QuoteComponent {
  visible: boolean = false;
  devis: string = '';
  selectedvoiture: any | undefined;
  problem: Problem | undefined;
  constructor(private queryClient: QueryClient, private router: Router) {}
  showDialog() {
    this.visible = true;
  }
  getInitialName(name: string) {
    return getInitials(name);
  }
  initValeur() {
    this.visible = false;
    this.devis = '';
    this.selectedvoiture = undefined;
  }

  onFetchedCar(): { label: string; value: Voiture }[] {
    const reponse = this.usegetCarsUser.data().data;
    return reponse.map((car: Voiture) => ({
      label: `${car.brand} - ${car.model}`,
      value: car,
    }));
  }
  ongetDevis(problem: Problem) {
    this.problem = problem;
  }
  onLoadingCar() {
    return this.usegetCarsUser.isPending();
  }
  onErrorCar() {
    return this.usegetCarsUser.isError();
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
  async onUseSendRequestProblem() {
    if (this.selectedvoiture?.value._id !== undefined) {
      const id_car = this.selectedvoiture?.value._id;
      const problem = this.devis;
      const reponse = await this.useRequestProblem.mutateAsync({
        carId: id_car,
        description: problem,
      });
      console.log(reponse);
      if (reponse.succes === false) {
        alert(reponse.message);
      } else {
        this.initValeur();
      }
    } else {
      alert('Tous les champs requis ne sont pas fournis.');
    }
  }
  isLoadingProblem() {
    return this.useRequestProblem.isPending();
  }
  async getCarsUser() {
    try {
      const response = await instanceAxios.get('/client/get_cars', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetCarsUser = injectQuery(() => ({
    queryKey: ['carsUser', localStorage.getItem('token')],
    queryFn: this.getCarsUser,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));

  async getProblem() {
    try {
      const response = await instanceAxios.get('/client/get_problem', {
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

  async RequestProblem(body: any) {
    try {
      const response = await instanceAxios.post(
        '/client/request_problem',
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useRequestProblem = injectMutation(() => ({
    mutationFn: (body: any) => this.RequestProblem(body),
    onError() {},
    onSuccess: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['requestproblem', localStorage.getItem('token')],
      });
    },
  }));
}
