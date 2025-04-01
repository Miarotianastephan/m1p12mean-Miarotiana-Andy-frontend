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
import { getInitials } from '../../func/global.function';
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

  loadingUserConnected() {
    return this.authService.usegetUserConnectedByToken.isPending();
  }
  errorUserConnected() {
    return this.authService.usegetUserConnectedByToken.isError();
  }
  onUseUserConnected() {
    const data = this.authService.usegetUserConnectedByToken.data();
    return data;
  }
  getInitialsName(fullname: string) {
    return getInitials(fullname);
  }
  async ngOnInit() {
    const user = await this.authService.UserConnectedByToken();
    if (user.role === 'client') {
      this.items = [
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
        {
          label: 'Demande de remorquage',
          icon: 'pi pi-exclamation-triangle',
          route: '/content/remorquage',
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
    this.authService.logOutApp();
  }
}
