import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import instanceAxios from '../../api/axios-config';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';
import { Reparation } from '../../interface/Reparation';
import { SkeletonModule } from 'primeng/skeleton';
import { IMechanic } from '../../interface/Mecanich';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DrawerModule } from 'primeng/drawer';
import { getInitials } from '../../func/global.function';

dayjs.extend(utc); // Active le plugin utc
@Component({
  selector: 'app-repairmanager',
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    ProgressBarModule,
    TagModule,
    ButtonModule,
    AvatarModule,
    PanelModule,
    DialogModule,
    SkeletonModule,
    DatePickerModule,
    FormsModule,
    DrawerModule,
  ],
  templateUrl: './repairmanager.component.html',
  styleUrl: './repairmanager.component.css',
})
export class RepairmanagerComponent {
  repair_choix!: Reparation;
  visible: boolean = false;
  visible_modal_creneaux: boolean = false;
  mecano_assign: IMechanic[] = [];
  isClicked = new Set<any>();
  date: Date | undefined;
  time: Date | undefined;
  repartion_visible: boolean = false;
  reparation_progression: Reparation | undefined;
  creneaux: { dateBegin: Date; dateFin: Date }[] = [];
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
    this.repair_choix = item;
  }
  ShowDialogCreneaux(item: Reparation) {
    this.visible_modal_creneaux = true;
    this.repair_choix = item;
  }
  showCreneaux() {
    if (!this.date || !this.time) {
      console.error("La date ou l'heure est manquante !");
      return;
    }
    const datePart = dayjs(this.date);
    const timePart = dayjs(this.time);
    const dateWithTime = datePart
      .set('hour', timePart.hour())
      .set('minute', timePart.minute())
      .set('second', timePart.second());
    const dateFin = dateWithTime.add(
      this.repair_choix.estimationtime,
      'minute'
    );
    this.creneaux.push({
      dateBegin: dateWithTime.toDate(),
      dateFin: dateFin.toDate(),
    });
    console.log(this.creneaux);
    this.date = undefined;
    this.time = undefined;
  }

  assignMecano(mecano: IMechanic) {
    const index = this.mecano_assign.findIndex((m) => m.email === mecano.email);
    if (index === -1) {
      this.mecano_assign.push(mecano);
      this.isClicked.add(mecano);
    } else {
      this.mecano_assign.splice(index, 1);
      this.isClicked.delete(mecano);
    }
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
  async CreateCreneaux(
    repair_choix_id: string,
    horaire_rdv: { dateBegin: Date; dateFin: Date }[]
  ) {
    try {
      const response = await instanceAxios.post(
        '/manager/createCreneaux',
        { repair_choix_id, horaire_rdv },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useCreateCreneaux = injectMutation(() => ({
    mutationFn: (data: {
      repairid: string;
      horaire_rdv: { dateBegin: Date; dateFin: Date }[];
    }) => this.CreateCreneaux(data.repairid, data.horaire_rdv),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['l_reparation', localStorage.getItem('token')],
      });
    },
  }));

  async OnuseCreateCreneaux() {
    console.log(this.creneaux);
    const reponse = await this.useCreateCreneaux.mutateAsync({
      repairid: this.repair_choix._id,
      horaire_rdv: this.creneaux,
    });
    if (reponse.succes === true) {
      this.visible_modal_creneaux = false;
      this.creneaux = [];
      console.log(reponse);
    } else {
      alert(reponse.message);
    }
  }

  async ToAssignMecanoWork(repairid: string, mecano: IMechanic[]) {
    try {
      const response = await instanceAxios.post(
        '/manager/assign_mecanicien_work',
        { id_repair: repairid, mecano: mecano },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  useToAssingMecanoWork = injectMutation(() => ({
    mutationFn: (data: { repairid: string; mecanicien: IMechanic[] }) =>
      this.ToAssignMecanoWork(data.repairid, data.mecanicien),
    onError() {},
    onSuccess() {},
    onSettled: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['l_reparation', localStorage.getItem('token')],
      });
    },
  }));

  async OnuseToAssingMecanoWork() {
    const repairid = this.repair_choix._id;
    const reponse = await this.useToAssingMecanoWork.mutateAsync({
      repairid,
      mecanicien: this.mecano_assign,
    });
    if (reponse.succes === true) {
      this.visible = false;
      this.mecano_assign = [];
    } else {
      alert(reponse.message);
    }
    console.log(reponse);
  }

  onusegetMecaniciens(): IMechanic[] {
    const reponse = this.usegetMecaniciens.data().data;
    return reponse;
  }
  onErrorgetMecaniciens() {
    const error = this.usegetMecaniciens.isError();
    return error;
  }
  onLoadinggetMecaniciens() {
    return this.usegetMecaniciens.isPending();
  }
  async getMecaniciens() {
    try {
      const response = await instanceAxios.get('/manager/get_mecanicien', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  usegetMecaniciens = injectQuery(() => ({
    queryKey: ['l_mecaniciens', localStorage.getItem('token')],
    queryFn: this.getMecaniciens,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
      const response = await instanceAxios.get('/manager/getallrepair', {
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
