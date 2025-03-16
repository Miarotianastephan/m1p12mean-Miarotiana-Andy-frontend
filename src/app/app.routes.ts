import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'todos', component: TodosComponent },
          { path: 'mecanicien', loadChildren: () => import('./pages/manager/manager.routes') },
        ]
    },
];
