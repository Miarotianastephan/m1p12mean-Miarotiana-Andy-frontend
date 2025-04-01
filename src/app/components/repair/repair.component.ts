import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import instanceAxios from '../../api/axios-config';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Reparation } from '../../interface/Reparation';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { AppointmentDate } from '../../interface/Appointement';
import { signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { getInitials } from '../../func/global.function';
@Component({
  selector: 'app-repair',
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    ProgressBarModule,
    TagModule,
    ButtonModule,
    AvatarModule,
    PanelModule,
    SkeletonModule,
    DialogModule,
    DrawerModule,
  ],
  templateUrl: './repair.component.html',
  styleUrl: './repair.component.css',
  standalone: true,
})
export class RepairComponent {
  visible: boolean = false;
  reparation = signal<Reparation | null>(null);
  repartion_visible: boolean = false;
  reparation_progression: Reparation | undefined;
  loadingAppointments: { [key: string]: boolean } = {};
  constructor(private queryClient: QueryClient, private router: Router) {}
  getInitialName(name: string) {
    return getInitials(name);
  }
  PercentProgression(item: Reparation) {
    const todo = item.repair;
    const count_todo = todo.length;
    let count_finish = 0;
    todo.forEach((element) => {
      if (element.status === 'completed') {
        count_finish++;
      }
    });
    return ((count_finish * 100) / count_todo).toFixed(2);
  }
  showDrawer(item: Reparation) {
    this.repartion_visible = true;
    this.reparation_progression = item;
  }
  showDialog(item: Reparation) {
    this.visible = true;
    this.reparation.set(item);
  }
  skillsText(mecanicien: any): string {
    return mecanicien.skills.length > 0
      ? mecanicien.skills.map((skill: any) => skill.namecategory).join(', ')
      : 'Aucune compétence';
  }
  getColorTag(status: string) {
    if (status === 'in-progress') {
      return 'warn';
    } else if (status === 'en attente') {
      return 'secondary';
    } else {
      return 'success';
    }
  }
  async onAccepteRdv(rdv: any) {
    this.loadingAppointments[rdv._id] = true;
    try {
      const response = await this.useAccepteRdv.mutateAsync({
        repairid: this.reparation()!._id,
        rdvid: rdv._id,
      });
      console.log(response);
      this.visible = false;
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingAppointments[rdv._id] = false;
    }
  }

  async AccepteRdv(idrepair: string, id_rdv: string) {
    try {
      const response = await instanceAxios.post(
        '/client/accept_datereparation',
        {
          idrepair,
          id_rdv,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useAccepteRdv = injectMutation(() => ({
    mutationFn: (data: { repairid: string; rdvid: string }) =>
      this.AccepteRdv(data.repairid, data.rdvid),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['l_reparation', localStorage.getItem('token')],
      });
    },
  }));

  onusegetCreneauxbyrepair(): AppointmentDate | null {
    if (!this.reparation()) return null;
    const reponse = this.usegetCreneauxbyrepair.data()?.data;
    return reponse;
  }

  onErrorgetCreneauxbyrepair() {
    const error = this.usegetCreneauxbyrepair.isError();
    return error;
  }
  onLoadinggetCreneauxbyrepair() {
    return this.usegetCreneauxbyrepair.isPending();
  }

  async getCreneauxbyrepair() {
    try {
      const response = await instanceAxios.get(
        '/client/getcreneauxbyreparation',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { idrepair: this.reparation()?._id },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetCreneauxbyrepair = injectQuery(() => ({
    queryKey: [
      'l_creneaux',
      this.reparation()?._id,
      localStorage.getItem('token'),
    ],
    queryFn: this.getCreneauxbyrepair.bind(this),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!this.reparation(),
  }));

  onusegetReparation(): Reparation[] {
    const reponse = this.usegetReparation.data().data;
    return reponse;
  }
  onErrorgetReparation() {
    const error = this.usegetReparation.isError();
    return error;
  }
  onLoadinggetReparation() {
    return this.usegetReparation.isPending();
  }

  async getReparation() {
    try {
      const response = await instanceAxios.get('/client/getMyRepair', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetReparation = injectQuery(() => ({
    queryKey: ['l_reparation', localStorage.getItem('token')],
    queryFn: this.getReparation,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }));
}
