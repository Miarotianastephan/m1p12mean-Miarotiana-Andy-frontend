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
  modelName: string;
  year: number;
}
interface voiture {
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
  selectedbrand: voiture | undefined;
  selectedModel: model | undefined;
  selectType: string = '';
  models: [model] | undefined;
  uploadedFiles: any[] = [];
  Type: any[] = [];
  voitures: any[] = [];
  marque: any[] = [];
  mileage: number = 1;
  year: number = 2000;
  plaque: string = '';
  chasis: string = '';
  imagevoiture: string = '';
  uploading: boolean = false;
  constructor(
    private queryClient: QueryClient,
    private router: Router,
    private http: HttpClient
  ) {}
  showDialog() {
    this.visible = true;
  }
  showSelectedBrand() {
    if (this.selectedbrand !== undefined) {
      this.models = this.selectedbrand.models;
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles);
    }
  }

  ngOnInit(): void {
    this.Type = [{ name: 'Manuel' }, { name: 'Automatique' }];

    this.voitures = [
      {
        marque: 'Toyota',
        model: 'Corolla',
        kilometrage: 85000,
        annee: 2018,
        type: 'Automatique',
        imageVoiture: [
          'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
          'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        ],
      },
      {
        marque: 'BMW',
        model: 'Serie 3',
        kilometrage: 120000,
        annee: 2016,
        type: 'Manuel',
        imageVoiture: ['https://primefaces.org/cdn/primeng/images/card-ng.jpg'],
      },
      {
        marque: 'Peugeot',
        model: '208',
        kilometrage: 45000,
        annee: 2020,
        type: 'Automatique',
        imageVoiture: [
          'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
          'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        ],
      },
    ];

    this.marque = [
      {
        brand: 'Toyota',
        models: [
          { modelName: 'Corolla', year: 2023 },
          { modelName: 'Camry', year: 2022 },
          { modelName: 'RAV4', year: 2024 },
        ],
      },
      {
        brand: 'Honda',
        models: [
          { modelName: 'Civic', year: 2023 },
          { modelName: 'Accord', year: 2022 },
          { modelName: 'CR-V', year: 2024 },
        ],
      },
      {
        brand: 'Ford',
        models: [
          { modelName: 'Focus', year: 2023 },
          { modelName: 'Mustang', year: 2022 },
          { modelName: 'Explorer', year: 2024 },
        ],
      },
      {
        brand: 'BMW',
        models: [
          { modelName: 'Series 3', year: 2023 },
          { modelName: 'Series 5', year: 2022 },
          { modelName: 'X5', year: 2024 },
        ],
      },
      {
        brand: 'Mercedes-Benz',
        models: [
          { modelName: 'C-Class', year: 2023 },
          { modelName: 'E-Class', year: 2022 },
          { modelName: 'GLC', year: 2024 },
        ],
      },
    ];
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
  }));

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
  async onAddCar() {
    console.log('------------------------');
    console.log(this.selectedbrand);
    console.log(this.selectedModel);
    console.log(this.Type);
    console.log(this.chasis);
    console.log(this.plaque);
    console.log(this.mileage);
    console.log(this.year);
    console.log(this.uploadedFiles);
    console.log('------------------------');
    const body = {
      brandId: this.selectedbrand?.brand,
      brand: this.selectedbrand,
      modelId: this.selectedModel,
      model: this.selectedModel,
      year: this.year,
      registrationNumber: this.plaque,
      chassisNumber: this.chasis,
      imagefile: this.uploadedFiles,
    };
    const reponse = await this.useCreateCar.mutateAsync({ body });
    console.log(reponse);
  }
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
