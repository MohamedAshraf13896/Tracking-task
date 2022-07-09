import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssigneeService {

  constructor(private AssigneeService:HttpClient) { }
  BaseURl = "http://localhost:48755/api/Assignee"
  GetAllAssignees(){
    return this.AssigneeService.get(this.BaseURl , {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});
  }
}
