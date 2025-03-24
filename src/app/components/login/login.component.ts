import { Component } from '@angular/core';
import { LoginformComponent } from '../loginform/loginform.component';

@Component({
  selector: 'app-login',
  imports: [LoginformComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
