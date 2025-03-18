import { Injectable, OnInit, signal } from '@angular/core';
import instanceAxios from '../axios-config';
import { injectQuery } from '@tanstack/angular-query-experimental';
export interface User {
  id: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async UserConnectedByToken() {
    try {
      const response = await instanceAxios.get('/auth/user_connected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.user);
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  }

  usegetUserConnectedByToken = injectQuery(() => ({
    queryKey: ['user_connected', localStorage.getItem('token')],
    queryFn: this.UserConnectedByToken,
    staleTime: Infinity,
    gcTime: Infinity,
  }));
}
