import { Routes } from '@angular/router';
import { MecanicienComponent } from './mecanicien/mecanicien.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { CreateDevisComponent } from './create-devis/create-devis.component';
import { ManagerproblemComponent } from '../../components/managerproblem/managerproblem.component';
import { RepairmanagerComponent } from '../../components/repairmanager/repairmanager.component';

export default [
  { path: 'rdv', component: RendezvousComponent },
  { path: 'meca', component: MecanicienComponent },
  { path: 'problem', component: ManagerproblemComponent },
  { path: 'creer-devis', component: CreateDevisComponent },
  { path: 'suivireparation', component: RepairmanagerComponent },
] as Routes;
