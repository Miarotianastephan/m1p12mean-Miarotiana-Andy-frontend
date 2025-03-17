import { Injectable } from '@angular/core';
import { ProblemReport } from '../../model/problem-report.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemReportService {
  private apiUrl = 'http://localhost:5000/manager/problems';

  constructor(private http: HttpClient) {}

  getProblemReports(): Observable<ProblemReport[]> {
    return this.http.get<{ success: boolean, problems: ProblemReport[] }>(this.apiUrl)
    .pipe(
      map(response => response.problems) // Extrait uniquement le tableau `problems`
    );
  }
}
