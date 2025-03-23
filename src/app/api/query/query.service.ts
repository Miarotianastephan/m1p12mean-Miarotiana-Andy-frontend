import { Injectable } from '@angular/core';
import instanceAxios from '../axios-config';
import { injectMutation } from '@tanstack/angular-query-experimental';
@Injectable({
  providedIn: 'root',
})
export class QueryService {
  async Authentification(body: any) {
    try {
      const response = await instanceAxios.post('/auth/login', body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  MutateAuthentification = injectMutation(() => ({
    mutationFn: (body: any) => this.Authentification(body),
    onError() {},
    onSuccess() {},
  }));
}
