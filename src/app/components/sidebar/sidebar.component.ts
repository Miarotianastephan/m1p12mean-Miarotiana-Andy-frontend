import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { SidebarService } from '../../services/sidebar.service'

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, DrawerModule, ButtonModule, Ripple, AvatarModule, Menu],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  visible: boolean = false; // Plus besoin de `@ViewChild`
  
  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    
    this.sidebarService.visible$.subscribe(value => {
      this.visible = value;
    });

    this.items = [
      {
        label: 'Navigation',
        items: [
          { label: 'Accueil', icon: 'pi pi-home', route: '/' },
          { label: 'Rendez-vous', icon: 'pi pi-calendar', route: '/mecanicien/rdv' },
          { label: 'Mécanicien', icon: 'pi pi-users', route: '/mecanicien/meca' },
          { label: 'Demande de devis', icon: 'pi pi-users', route: '/mecanicien/problem' },
        ]
      }
    ];
  }

  closeSidebar() {
    this.sidebarService.toggle();
  }
}
