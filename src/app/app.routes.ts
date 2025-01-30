import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CheckEmailComponent } from './Pages/check-email/check-email.component';
import { RedefinirComponent } from './Pages/redefinir/redefinir.component';
import { authGuard } from './Guard/auth.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TaskComponent } from './Pages/task/task.component';
import { ManagerTaskComponent } from './Pages/manager-task/manager-task.component';
import { ExpensesComponent } from './Pages/expenses/expenses.component';
import { ReportExpenseComponent } from './Pages/report-expense/report-expense.component';
import { MenteeComponent } from './Pages/mentee/mentee.component';
import { MenteeTaskComponent } from './Pages/mentee-task/mentee-task.component';
import { ListMenteeTaskComponent } from './Pages/list-mentee-task/list-mentee-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'check-email', component: CheckEmailComponent },
  {
    path: 'redefinir',
    component: RedefinirComponent,
    canActivate: [authGuard],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tarefas', component: TaskComponent },
  { path: 'gerenciar-tarefas', component: ManagerTaskComponent },
  { path: 'gastos', component: ExpensesComponent },
  { path: 'relatorio-gastos', component: ReportExpenseComponent },
  { path: 'mentoria', component: MenteeComponent },
  { path: 'tarefas-mentorados', component: MenteeTaskComponent },
  { path: 'lista-tarefas-mentorados', component: ListMenteeTaskComponent },
  { path: '**', redirectTo: '/login' },
];
