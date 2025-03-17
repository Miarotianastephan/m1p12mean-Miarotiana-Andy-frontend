import { Routes } from "@angular/router";
import { MecanicienComponent } from "./mecanicien/mecanicien.component";
import { RendezvousComponent } from "./rendezvous/rendezvous.component";
import { ListProblemComponent } from "./list-problem/list-problem.component";

export default [
    { path: 'rdv', component: RendezvousComponent },
    { path: 'meca', component: MecanicienComponent },
    { path: 'problem', component: ListProblemComponent },
] as Routes;