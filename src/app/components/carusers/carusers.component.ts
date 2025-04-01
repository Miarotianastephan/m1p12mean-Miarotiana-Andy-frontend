import { Component, OnInit } from '@angular/core';
import { CardcarComponent } from '../cardcar/cardcar.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import instanceAxios from '../../api/axios-config';
import { Router } from '@angular/router';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Voiture } from '../../interface/Voiture';
import { HttpClient } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
interface model {
  _id: string;
  modelName: string;
  year: number;
}
interface Brand {
  _id: string;
  brand: string;
  models: [model];
}

@Component({
  selector: 'app-carusers',
  standalone: true,
  imports: [
    CardcarComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    FileUpload,
    ProgressBarModule,
  ],
  templateUrl: './carusers.component.html',
  styleUrl: './carusers.component.css',
})
export class CarusersComponent implements OnInit {
  visible: boolean = false;
  selectedbrand: Brand | undefined;
  selectedModel: model | undefined;
  selectType: string | undefined;
  models: [model] | undefined;
  Type: any[] = [];
  mileage: number = 1;
  year: number = 2000;
  plaque: string = '';
  chasis: string = '';
  imagevoiture: string | undefined;
  uploading: boolean = false;
  constructor(
    private queryClient: QueryClient,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.Type = [{ name: 'Manuel' }, { name: 'Automatique' }];
  }
  initVal() {
    this.selectedbrand = undefined;
    this.selectedModel = undefined;
    this.selectType = undefined;
    this.plaque = '';
    this.chasis = '';
  }
  showDialog() {
    this.visible = true;
  }
  showSelectedBrand() {
    if (this.selectedbrand !== undefined) {
      console.log(this.selectedbrand);
      this.models = this.selectedbrand.models;
    }
  }
  async CreateCar(body: any) {
    try {
      const reponse = await instanceAxios.post('/client/add_cars', body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return reponse.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }
  useCreateCar = injectMutation(() => ({
    mutationFn: (body: any) => this.CreateCar(body),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['carsUser', localStorage.getItem('token')],
      });
    },
  }));

  async onAddCar() {
    const reponse = await this.useCreateCar.mutateAsync({
      brandId: this.selectedbrand?._id,
      brand: this.selectedbrand?.brand,
      modelId: this.selectedModel?._id,
      model: this.selectedModel?.modelName,
      year: this.year,
      registrationNumber: this.plaque,
      chassisNumber: this.chasis,
      imagefile: this.imagevoiture,
      type: this.selectType,
      mileage: this.mileage,
    });
    if (reponse.succes === true) {
      this.initVal();
      this.visible = false;
    }
  }

  uploadToImageBB(event: any) {
    const file = event.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.uploading = true;
    this.http
      .post(
        `https://api.imgbb.com/1/upload?key=ca2d96c9ae967bb975557194bd8ec9e3`,
        formData
      )
      .subscribe(
        (response: any) => {
          console.log('✅ Upload réussi !', response);
          console.log('📷 URL de l’image :', response.data.url);
          this.uploading = false;
          this.imagevoiture = response.data.url;
        },
        (error) => {
          console.error('❌ Erreur lors de l’upload', error);
          this.uploading = false;
        }
      );
  }
  ongetBrands(): Brand[] {
    const reponse = this.usegetgetBrands.data().data;
    return reponse;
  }
  onLoadinggetBrands() {
    return this.usegetgetBrands.isPending();
  }
  onErrorgetBrands() {
    return this.usegetgetBrands.isError();
  }
  async getBrands() {
    try {
      const response = await instanceAxios.get('/client/getbrands', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetgetBrands = injectQuery(() => ({
    queryKey: ['getBrands', localStorage.getItem('token')],
    queryFn: this.getBrands,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));

  onFetchedCar(): Voiture[] {
    const reponse = this.usegetCarsUser.data().data;
    return reponse;
  }
  onLoadingCar() {
    return this.usegetCarsUser.isPending();
  }
  onErrorCar() {
    return this.usegetCarsUser.isError();
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
}
