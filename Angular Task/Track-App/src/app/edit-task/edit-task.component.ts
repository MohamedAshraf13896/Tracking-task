import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssigneeService } from '../services/assignee.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styles: [
  ]
})
export class EditTaskComponent implements OnInit {
  constructor(private projectservice:ProjectService , private assigneeservice:AssigneeService , private taskservice:TaskService, private nav:Router , private myRoute:ActivatedRoute, public datepipe: DatePipe) { }
  Task:any;
  Projects:any;
  Assignees:any;
  myproj :any;
  task_id:any;
  myassig :any;
  proj_id:any;
  assignee_id:any;
  newtitle:any;
  newDetails:any;
  newDate:any;
  TrackForm!: FormGroup;
  submited:boolean = false;
  mySub:any;
  Tasks:any;
  ngOnInit(): void {
    this.myRoute.params.subscribe(
      (Data)=>{
        this.task_id=Data["id"]
        this.taskservice.GetTaskByID(Data["id"]).subscribe(
          (data)=>{this.Task = data 
            this.TrackForm = new FormGroup({
              title: new FormControl(data.title,[Validators.required , Validators.minLength(4) , Validators.maxLength(10), Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")]),
              details: new FormControl (data.details,[Validators.required , Validators.minLength(4) , Validators.maxLength(10) , Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")]),
              date:  new FormControl (data.date.toString().substring(0,10),[Validators.required])
            })
          }     
        )
  
      },
      (err)=> {
        if(err.status  == 401) {
          this.nav.navigate(['/login'])
        }
      }
    )
    this.myproj = this.projectservice.GetAllProjects().subscribe(
      (data)=>{this.Projects = data},
      
      (err)=> {if(err.status  == 401) {
        this.nav.navigate(['/login'])
      }}
    )
    this.myassig = this.assigneeservice.GetAllAssignees().subscribe(
      (data)=>{this.Assignees = data},
      
      (err)=> {if(err.status  == 401) {
        this.nav.navigate(['/login'])
      }}
    )

  }
  SelectProj_ID(e:any) {
    this.proj_id = e.target.value
    console.log(this.proj_id)
 }
 SelectAssig_ID(e:any) {
   this.assignee_id = e.target.value
   console.log(this.assignee_id)
 }

 updateTask() {
    this.submited = true;
    if(this.TrackForm.valid) {
      let task = { id:+this.task_id , title:this.TrackForm.value.title , details:this.TrackForm.value.details , date:this.TrackForm.value.date , assignee_ID:+this.assignee_id , project_ID:+this.proj_id };
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger m-3'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Edit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        this.taskservice.UpdateTaskByID(this.task_id,task).subscribe(
          ()=>{},
          (err)=> {if(err.status  == 401) {
            this.nav.navigate(['/login'])
          }}
        );
          swalWithBootstrapButtons.fire(
            'Edited!',
            'Your Task has been Edited.',
            'success'
          )
          if(result.isConfirmed) {
            this.nav.navigate(['/Tasks'])
        .then(() => {
          window.location.reload();
        });
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.nav.navigate([`Edittask/${this.task_id}`]);
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Task Data Not Edited :)',
            'error'
          )
        }
      })  
    }
    }
  clearData() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger m-3'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reset it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.newDate=""
          this.newDetails=""
          this.newtitle=""
          swalWithBootstrapButtons.fire(
            'Reset!',
            'Your Task Data has been Reset.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.nav.navigate([`Edittask/${this.task_id}`]);
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Task Data is safe :)',
            'error'
          )
        }
      })  
  }
}
