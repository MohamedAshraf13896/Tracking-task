import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssigneeService } from '../services/assignee.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styles: [
  ]
})
export class AddTaskComponent implements OnInit {

  constructor(private projectservice:ProjectService , private assigneeservice:AssigneeService , private taskservice:TaskService, private nav:Router) { }
  Projects:any;
  Assignees:any;
  myproj :any;
  myassig :any;
  proj_id:any;
  assignee_id:any;
  TrackForm!: FormGroup;
  submited:boolean = false;
  ngOnInit(): void {
    this.myproj = this.projectservice.GetAllProjects().subscribe(
      (data)=>{this.Projects = data},
      
      (err)=> {
        if(err.status  == 401) {
        this.nav.navigate(['/login'])
      }}
    )
    this.myassig = this.assigneeservice.GetAllAssignees().subscribe(
      (data)=>{this.Assignees = data},
      
      (err)=> {
        if(err.status  == 401) {
        this.nav.navigate(['/login'])
      }}
    )

    this.TrackForm = new FormGroup({
      title: new FormControl("",[Validators.required , Validators.minLength(4) , Validators.maxLength(10), Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")]),
      details: new FormControl ("",[Validators.required , Validators.minLength(4) , Validators.maxLength(10) , Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")]),
      date:  new FormControl ("",[Validators.required])
    })
  }
  addNew(title: string, details: string, date: any , assignee_ID:number  , project_ID:number) {
      this.submited = true;
      if(this.TrackForm.valid) {
        let task = { title, details , date , assignee_ID:+assignee_ID , project_ID:+project_ID };
        if(title && details && date && assignee_ID && project_ID ){
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
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.taskservice.AddnewTask(task).subscribe(
                ()=>{},
                (error)=> {
                  if(error.status  == 401) {
                    this.nav.navigate(['/login'])
                  }
                }
              );

              swalWithBootstrapButtons.fire(
                'Added!',
                'Your Task has been Added.',
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
              this.nav.navigate(['Addtask']);
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Task Data Not Added :)',
                'error'
              )
            }
          })  
        }
      }
}
SelectProj_ID(e:any) {
   this.proj_id = e.target.value
   console.log(this.proj_id)
}
SelectAssig_ID(e:any) {
  this.assignee_id = e.target.value
  console.log(this.assignee_id)
}
}
