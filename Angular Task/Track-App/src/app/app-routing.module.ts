import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TasksComponent } from './tasks/tasks.component';


const routes: Routes = [
  {path:"Tasks",component:TasksComponent},
  {path:"info/:id",component:TaskInfoComponent },
  {path:"Addtask", component:AddTaskComponent},
  {path:"Edittask/:id", component:EditTaskComponent},
  {path:"Home", component:HomeComponent},
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
