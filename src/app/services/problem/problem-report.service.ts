import { Injectable } from '@angular/core';
import { ProblemReport } from '../../model/problem-report.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemReportService {
  private apiUrl = `${environment.apiUrl}/manager/problems`;

  constructor(private http: HttpClient) {}

  getProblemReports(): Observable<ProblemReport[]> {
    return this.http.get<{ success: boolean, problems: ProblemReport[] }>(this.apiUrl)
    .pipe(
      map(response => response.problems)
    );
  }
}
