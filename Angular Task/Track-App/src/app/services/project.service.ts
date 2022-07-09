import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private ProjectService:HttpClient) { }
  BaseURl = "http://localhost:48755/api/Project"
  GetAllProjects(){
    return this.ProjectService.get(this.BaseURl, {headers:{"Authorization":"Bearer "+localStorage.getItem("User")}});
  }
}
