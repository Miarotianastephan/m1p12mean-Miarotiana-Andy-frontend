import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface QuoteRequest {
  problemId: string;
  userId: string;
  carId: string;
  type: string;
  items: any[];
  repair: any[];
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = `${environment.apiUrl}/mecano/give_devis`;

  constructor(private http: HttpClient) {}

  createQuote(data: QuoteRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  //PIECE
  getPriceParts(parts: any[]){
    let total = 0;
    if(parts.length>0){
      parts.forEach((part) => {
        total += part.price * part.quantity;
      })
    }
    return total;
  }
  // SERVICES
  getPriceReparation(services: any[]){    
    let total = 0;
    if(services.length>0){
      services.forEach((s) => {
        total += s.estimatedprice;
      })
    }
    return total;
  }

}
