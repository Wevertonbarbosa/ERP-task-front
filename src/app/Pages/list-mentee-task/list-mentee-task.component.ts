import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';
import { OrderListModule } from 'primeng/orderlist';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { UserService } from '../../Service/user.service';
import { UserGlobalService } from '../../Service/user-global.service';
import { ListMentee } from '../../Interface/list-mentee';
import { TaskService } from '../../Service/task.service';
import { TaskCheckService } from '../../Service/task-check.service';

@Component({
  selector: 'app-list-mentee-task',
  imports: [
    MenuComponent,
    CardModule,
    OrderListModule,
    Tag,
    CommonModule,
    SelectModule,
    Select,
  ],
  templateUrl: './list-mentee-task.component.html',
  styleUrl: './list-mentee-task.component.css',
  providers: [UserService, TaskService, TaskCheckService],
})
export class ListMenteeTaskComponent implements OnInit {
  products!: any[];
  userId!: number;
  userMentee: any[] = [];
  nameMentee: ListMentee[] = [];

  constructor(
    private service: UserService,
    private serviceTask: TaskService,
    private serviceTaskCheck: TaskCheckService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

    this.getMentee();
  }

  getMentee() {
    try {
      this.service.getMeentFromAdmin(this.userId).subscribe({
        next: (value) => {
          this.userMentee = value.map((data: any) => ({
            id: data.usuarioId,
            email: data.email,
            nome: data.nome,
            role: data.role,
            tarefasConcluidas: data.tarefasConcluidas,
            tarefasPendentes: data.tarefasPendentes,
          }));

          this.nameMentee = value.map((data: any) => ({
            mentee: data.nome,
            id: data.usuarioId,
          }));
        },
        error: (err) => {
          console.error('Erro para carregar os dados ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  onMenteeSelect(value: any) {
    if (value != null) {
      console.log(value.id);

      this.getTaskMentee(value.id);
    } else {
    }
  }

  getTaskMentee(id: number) {
    try {
      this.serviceTask.getTasks(id).subscribe({
        next: (value) => {
          this.serviceTaskCheck.getTaskSignal(id).subscribe({
            next: (signalTasks) => {
              console.log(signalTasks);

              const signalMap = new Map(
                signalTasks.map((task: any) => [
                  task.tarefa,
                  task.sinalizadaUsuario,
                ])
              );
              const doneMap = new Map(
                signalTasks.map((task: any) => [task.tarefa, task.concluida])
              );

              this.products = value.map((task: any) => ({
                id: task.id,
                responsavelId: task.responsavelId,
                status: task.status,
                titulo: task.titulo,
                descricao: task.descricao,
                categoria: task.categoria,
                frequencia: task.frequencia,
                dataInicio: this.formatDate(task.dataInicio),
                dataFim: this.formatDate(task.dataFim),
                diasSemana: task.diasSemana,
                checked: false,
                deleteTask: false,
                sinalizadaUsuario: signalMap.get(task.id) ?? false,
                done: doneMap.get(task.id) ?? false,
              }));
            },
          });
        },
        error: (err) => {
          console.error('Erro para carregar os dados ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  formatDate(date: string): string {
    if (!date) return ''; 

    const [year, month, day] = date.split('-'); 

    return `${day}-${month}-${year}`;
  }
}
