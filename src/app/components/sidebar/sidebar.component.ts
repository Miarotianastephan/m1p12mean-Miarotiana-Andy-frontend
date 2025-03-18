import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../api/query/global.service';
@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    CommonModule,
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    Menu,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  visible: boolean = false; // Plus besoin de `@ViewChild`
  fullname: string | undefined = '';
  userConnected: any = null;
  constructor(
    private sidebarService: SidebarService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.sidebarService.visible$.subscribe((value) => {
      this.visible = value;
    });
    this.items = [
      {
        label: 'Navigation',
        items: [
          { label: 'Accueil', icon: 'pi pi-palette', route: '/content' },
          { label: 'External', icon: 'pi pi-home', route: '/content/todos' },
          { label: 'Voitures', icon: 'pi pi-car', route: '/content/todos' },
        ],
      },
    ];
  }

  initUserConnected() {
    return this.authservice.usegetUserConnectedByToken.data();
  }
  IsLoading() {
    return this.authservice.usegetUserConnectedByToken.isPending();
  }
  IsError() {
    return this.authservice.usegetUserConnectedByToken.error();
  }
  closeSidebar() {
    this.sidebarService.toggle();
  }
}
