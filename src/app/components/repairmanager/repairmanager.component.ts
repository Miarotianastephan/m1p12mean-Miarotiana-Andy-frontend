import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
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
  ],
  templateUrl: './repairmanager.component.html',
  styleUrl: './repairmanager.component.css',
})
export class RepairmanagerComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
