import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { WorkmecanoComponent } from '../workmecano/workmecano.component';
@Component({
  selector: 'app-taskmecano',
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    AvatarModule,
    DividerModule,
    WorkmecanoComponent,
  ],
  templateUrl: './taskmecano.component.html',
  styleUrl: './taskmecano.component.css',
})
export class TaskmecanoComponent {}
