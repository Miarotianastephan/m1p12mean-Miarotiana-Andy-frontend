import { Injectable, inject } from '@angular/core';
import instanceAxios from '../axios-config';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  queryClient = inject(QueryClient);

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
