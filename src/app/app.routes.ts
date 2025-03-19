import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './components/login/login.component';
import { CarusersComponent } from './components/carusers/carusers.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'content',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'mycars', component: CarusersComponent },
    ],
  },
];
