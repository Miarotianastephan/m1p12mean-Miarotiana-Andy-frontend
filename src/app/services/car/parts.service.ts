import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Part } from '../../model/part.model';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  private apiUrl = `${environment.apiUrl}/manager/all-parts`;

  constructor(private http: HttpClient) { }

  getAllParts(): Observable<Part[]>{
    return this.http
    .get<{ success: boolean , parts: Part[] }>(this.apiUrl)
    .pipe(map(response => response.parts));
  }
}
