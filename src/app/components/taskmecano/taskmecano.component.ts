import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';
import { Reparation } from '../../interface/Reparation';
import instanceAxios from '../../api/axios-config';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { getInitials } from '../../func/global.function';
@Component({
  selector: 'app-taskmecano',
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    AvatarModule,
    DividerModule,
    DrawerModule,
    CommonModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    PanelModule,
  ],
  templateUrl: './taskmecano.component.html',
  styleUrl: './taskmecano.component.css',
})
export class TaskmecanoComponent {
  repartion_visible: boolean = false;
  reparation_progression: Reparation | undefined;
  loadingWork: { [key: string]: boolean } = {};
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
  getColorTag(status: string) {
    if (status === 'in-progress') {
      return 'warn';
    } else if (status === 'en attente') {
      return 'secondary';
    } else {
      return 'success';
    }
  }
  skillsText(mecanicien: any): string {
    return mecanicien.skills.length > 0
      ? mecanicien.skills.map((skill: any) => skill.namecategory).join(', ')
      : 'Aucune compétence';
  }
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

  async DoReparation(repairid: string, idworktodo: string, isbegin: boolean) {
    try {
      const response = await instanceAxios.post(
        '/mecano/dowork',
        {
          id_repair: repairid,
          id_worktodo: idworktodo,
          isbegin: isbegin,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useDoReparation = injectMutation(() => ({
    mutationFn: (data: {
      repairid: string;
      idworktodo: string;
      isbegin: boolean;
    }) => this.DoReparation(data.repairid, data.idworktodo, data.isbegin),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['l_reparation', localStorage.getItem('token')],
      });
      this.repartion_visible = false;
    },
  }));

  async onUseDoReparation(id: string, isbegin: boolean) {
    this.loadingWork[id] = true;
    try {
      console.log('repairation : ' + this.reparation_progression?._id);
      console.log('subcateogry : ' + id);
      const work = await this.useDoReparation.mutateAsync({
        repairid: this.reparation_progression!._id,
        idworktodo: id,
        isbegin: isbegin,
      });
      console.log(work);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingWork[id] = false;
    }
  }

  async getReparation() {
    try {
      const response = await instanceAxios.get('/mecano/reparation_assgined', {
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
