import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QueryService } from '../../api/query/query.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../api/query/global.service';
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
      this.router.navigate(['/content']);
    }
  }
  isLoading() {
    return this.queryService.MutateAuthentification.isPending();
  }
}
