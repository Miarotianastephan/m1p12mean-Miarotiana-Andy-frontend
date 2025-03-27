import { Routes } from '@angular/router';
import { MecanicienComponent } from './mecanicien/mecanicien.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ManagerproblemComponent } from '../../components/managerproblem/managerproblem.component';
import { RepairmanagerComponent } from '../../components/repairmanager/repairmanager.component';
import { BoardmanagerComponent } from './boardmanager/boardmanager.component';

export default [
  { path: 'rdv', component: RendezvousComponent },
  { path: 'meca', component: MecanicienComponent },
  { path: 'problem', component: ManagerproblemComponent },
  { path: 'boardmanager', component: BoardmanagerComponent },
  { path: 'suivireparation', component: RepairmanagerComponent },
] as Routes;
