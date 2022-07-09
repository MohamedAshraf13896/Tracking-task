import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../edit-task/task_interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private TaskServices:HttpClient) { }
  BaseURl = "http://localhost:48755/api/Task"
  GetAllTasks(){
    console.log(localStorage.getItem("User"))
    return this.TaskServices.get(this.BaseURl , {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});
  }
  GetTaskByID(_TaskId:number):Observable<Task>{
    return (this.TaskServices.get<Task>(`${this.BaseURl}/${_TaskId}`, {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}}));
  }
  DeleteTaskByID(_TaskId:number){

    return this.TaskServices.delete(`${this.BaseURl}?id=${_TaskId}` , {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});

  }
  UpdateTaskByID(_TaskId:number, Task:any){
    return this.TaskServices.put(`${this.BaseURl}/${_TaskId}`,Task , {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});
  }
  AddnewTask(Task: any) {

    return this.TaskServices.post(this.BaseURl, Task , {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});

  }
}
