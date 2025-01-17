import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CheckEmailComponent } from './Pages/check-email/check-email.component';
import { RedefinirComponent } from './Pages/redefinir/redefinir.component';
import { authGuard } from './Guard/auth.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TaskComponent } from './Pages/task/task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'check-email', component: CheckEmailComponent },
  { path: 'redefinir', component: RedefinirComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tarefas', component: TaskComponent },
  { path: '**', redirectTo: '/login' }, // Redireciona para o login em caso de URL inexistente
];
