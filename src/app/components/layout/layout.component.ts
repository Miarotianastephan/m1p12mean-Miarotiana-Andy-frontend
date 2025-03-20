import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../api/query/global.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class LayoutComponent {
  constructor(private authservice: AuthService) {}
  initUserConnected() {
    return this.authservice.usegetUserConnectedByToken.data();
  }
  IsLoading() {
    return this.authservice.usegetUserConnectedByToken.isPending();
  }
  IsError() {
    return this.authservice.usegetUserConnectedByToken.error();
  }
}
