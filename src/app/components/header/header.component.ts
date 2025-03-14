import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-header',
  imports: [CommonModule, Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
  title = "Appli Angular"

  constructor(private sidebarService: SidebarService){}

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
