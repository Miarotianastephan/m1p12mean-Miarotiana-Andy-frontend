import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    RippleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  title = 'Appli Angular';

  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      { label: 'Accueil', icon: 'pi pi-palette', route: '/content' },
      { label: 'External', icon: 'pi pi-home', route: '/content/todos' },
      { label: 'Voitures', icon: 'pi pi-car', route: '/content/mycars' },
      {
        label: 'Request',
        icon: 'pi pi-question-circle',
        route: '/content/mydevis',
      },
    ];
  }
}
