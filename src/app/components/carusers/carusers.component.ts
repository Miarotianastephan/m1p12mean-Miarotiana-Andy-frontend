import { Component, OnInit } from '@angular/core';
import { CardcarComponent } from '../cardcar/cardcar.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
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

  constructor() {}
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
}
