import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QueryService } from '../../api/query/query.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginform',
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
  standalone: true,
})
export class LoginformComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;
  constructor(private router: Router, private queryService: QueryService) {}
  async OnUseAuthentification() {
    const response = await this.queryService.MutateAuthentification.mutateAsync(
      {
        email: this.email,
        password: this.password,
      }
    );
    if (response.succes === false) {
      this.error = response.message;
      this.email = '';
      this.password = '';
    } else {
      localStorage.setItem('token', response.token);
      if (response.user_connected.role === 'mecanicien') {
        this.router.navigate(['/content/boardmecano']);
      } else if (response.user_connected.role === 'client') {
        this.router.navigate(['/content/myrepair']);
      } else {
        this.router.navigate(['/content/manager/problem']);
      }
    }
  }
  isLoading() {
    return this.queryService.MutateAuthentification.isPending();
  }
}
