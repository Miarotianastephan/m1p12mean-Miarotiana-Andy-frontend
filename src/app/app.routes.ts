import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './components/login/login.component';
import { CarusersComponent } from './components/carusers/carusers.component';
import { RepairComponent } from './components/repair/repair.component';
import { QuoteComponent } from './components/quote/quote.component';
import { TaskmecanoComponent } from './components/taskmecano/taskmecano.component';
import { BoardmecanoComponent } from './components/boardmecano/boardmecano.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'content',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'mycars', component: CarusersComponent },
      { path: 'myrepair', component: RepairComponent },
      { path: 'mydevis', component: QuoteComponent },
      { path: 'task', component: TaskmecanoComponent },
      { path: 'boardmecano', component: BoardmecanoComponent },
    ],
  },
];
