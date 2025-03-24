import { Component, input, OnInit } from '@angular/core';
import { ProblemReport } from '../../../model/problem-report.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Part } from '../../../model/part.model';
import { PartsService } from '../../../services/car/parts.service';
import { SubCategory } from '../../../model/subcategory-service.model';
import { SubcategoryserviceService } from '../../../services/car/subcategoryservice.service';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QuoteService } from '../../../services/problem/quote.service';

@Component({
  selector: 'app-create-devis',
  imports: [CommonModule, TabsModule, CardModule, TableModule, FormsModule, InputNumber, ButtonModule],
  providers: [PartsService, SubcategoryserviceService],
  templateUrl: './create-devis.component.html',
  styleUrl: './create-devis.component.css'
})
export class CreateDevisComponent implements OnInit{
  loading: boolean = false;
  quoteType: string = 'Estimatif'; // ou 'Physique'
  selectedProblem!: ProblemReport;

  // Pour lister les pieces 
  dataParts!: Part[];
  private _cartParts!: Part[]; // pieces choisis
  cardPartsPrice: number = 0;

  get cartParts(): Part[] {
    return this._cartParts;
  }
  set cartParts(parts: Part[]) {
    this._cartParts = parts;
    this.refreshPartsPrice();
  }
  
  // Pour lister les category
  subCategories!: SubCategory[]
  private _cartSubCategories!: SubCategory[] // category choisis
  cardSubCategoriesPrice: number = 0

  get cartSubCategories(): SubCategory[] {
    return this._cartSubCategories;
  }
  set cartSubCategories(catego: SubCategory[]) {
    this._cartSubCategories = catego;
    this.refreshServicesPrice();
  }

  refreshPartsPrice(){
    this.cardPartsPrice = this.quoteService.getPriceParts(this.cartParts);
  }
  refreshServicesPrice(){
    this.cardSubCategoriesPrice = this.quoteService.getPriceReparation(this.cartSubCategories);
  }
  
  
  constructor(
    private router: Router,
    private partService: PartsService,
    private subcategoryService: SubcategoryserviceService,
    private quoteService: QuoteService
  ){}

  loadParts(){
    this.partService.getAllParts().subscribe({
      next: (response) => {
        this.dataParts = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des pièces :', error);
      }
    })
  }

  loadService(){
    this.subcategoryService.getAllSubCategoryServices().subscribe({
      next: (response) => {
        this.subCategories = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    })
  }

  ngOnInit(){
    this.selectedProblem = history.state.problem;
    if (!this.selectedProblem) {
      console.error('Aucun details selectionner.');
      this.router.navigate(['/mecanicien/problem']);
    }
    this.loadParts();
    this.loadService();
  }

  submitQuote(): void {
    if (!this.selectedProblem) {
      console.error('Aucun problème sélectionné.');
      return;
    }

    const formattedItems = this.cartParts.map((part) => ({
      partId: part._id,
      partName: part.partName,
      quantite: part.quantity ?? 1, // Par défaut 1 raha undefined
      provider: 'Garage', // Garage satria manome devis eto
      price: part.price,
    }));

    const formattedRepairs = this.cartSubCategories.map((subcat) => ({
      subcategoryid: subcat._id,
      categoryid: subcat.categoryid,
      subcategoryname: subcat.name,
      estimatedtime: subcat.estimatedtime,
      estimatedprice: subcat.estimatedprice,
      nbrepair: 1, // nila asina formulaire misaisir azy koa
      description: `Réparation de ${subcat.name}`,
      complexity: 1, // mila modifiena na esorina fa ataoko 1 fotsiny alony 
    }));

    const requestData = {
      problemId: this.selectedProblem._id,
      userId: this.selectedProblem.userId,
      carId: this.selectedProblem.carId,
      type: this.quoteType,
      items: formattedItems,
      repair: formattedRepairs,
    };

    // console.log(requestData);
    this.quoteService.createQuote(requestData).subscribe({
      next: (response) => {
        this.loading = true
        console.log('Devis créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création du devis:', error);
      },
      complete: () => {
        this.loading = false
        console.log('Requête terminée.');
      },
    });

  }

}
