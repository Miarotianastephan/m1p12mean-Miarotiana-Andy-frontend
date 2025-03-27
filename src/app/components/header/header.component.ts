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
import { UserService } from '../../api/services/UserService.service';
import { AuthService } from '../../api/query/global.service';
import { PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
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
    PopoverModule,
    DividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  title = 'Appli Angular';
  items: MenuItem[] | undefined;
  constructor(
    private userConnected: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  async ngOnInit() {
    const user = await this.authService.UserConnectedByToken();
    console.log('user_connected : ', user);
    if (user.role === 'client') {
      this.items = [
        { label: 'Accueil', icon: 'pi pi-palette', route: '/content' },
        { label: 'Voitures', icon: 'pi pi-car', route: '/content/mycars' },
        {
          label: 'Request',
          icon: 'pi pi-question-circle',
          route: '/content/mydevis',
        },
        {
          label: 'Suivi de reparation',
          icon: 'pi pi-calendar-clock',
          route: '/content/myrepair',
        },
      ];
    } else if (user.role === 'mecanicien') {
      this.items = [
        {
          label: 'Tableau de bord',
          icon: 'pi pi-chart-bar',
          route: 'boardmecano',
        },
        { label: 'Tache', icon: 'pi pi-book', route: 'task' },
      ];
    } else {
      this.items = [
        {
          label: 'Tableau de bord',
          icon: 'pi pi-chart-bar',
          route: 'manager/boardmanager',
        },
        {
          label: 'Rendez-vous',
          icon: 'pi pi-calendar',
          route: 'manager/rdv',
        },
        { label: 'Mecanicien', icon: 'pi pi-book', route: 'manager/meca' },
        {
          label: 'Request',
          icon: 'pi pi-question-circle',
          route: 'manager/problem',
        },
        {
          label: 'Suivi de reparation',
          icon: 'pi pi-calendar-clock',
          route: 'manager/suivireparation',
        },
      ];
    }
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
