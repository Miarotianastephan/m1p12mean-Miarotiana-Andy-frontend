import { Routes } from "@angular/router";
import { MecanicienComponent } from "./mecanicien/mecanicien.component";
import { RendezvousComponent } from "./rendezvous/rendezvous.component";

export default [
    { path: 'rdv', component: RendezvousComponent },
    { path: 'meca', component: MecanicienComponent },
] as Routes;