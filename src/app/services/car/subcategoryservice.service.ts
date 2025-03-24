import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SubCategory } from '../../model/subcategory-service.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryserviceService {
  private apiUrl = `${environment.apiUrl}/manager/all-services`;

  constructor(private http: HttpClient) {}

  getAllSubCategoryServices(): Observable<SubCategory[]> {
    return this.http
      .get<{ success: boolean; subservices: SubCategory[] }>(this.apiUrl)
      .pipe(map((response) => response.subservices));
  }
}
