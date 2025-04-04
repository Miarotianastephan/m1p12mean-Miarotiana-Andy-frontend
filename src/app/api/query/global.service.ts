import { Injectable } from '@angular/core';
import instanceAxios from '../axios-config';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { UserService } from '../services/UserService.service';
import { Router } from '@angular/router';
export interface User {
  id: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userservice: UserService,
    private router: Router,
    private client: QueryClient
  ) {}
  async UserConnectedByToken() {
    try {
      const response = await instanceAxios.get('/auth/user_connected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const user = response.data.user;
      this.userservice.setUser(user);
      return user;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetUserConnectedByToken = injectQuery(() => ({
    queryKey: ['user_connected', localStorage.getItem('token')],
    queryFn: this.UserConnectedByToken.bind(this),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));

  logOutApp() {
    this.client.removeQueries({
      queryKey: ['user_connected', localStorage.getItem('token')],
    });
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
