import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styles: [
  ]
})
export class TaskInfoComponent implements OnInit {
  Task:any;
  constructor(private taskservice:TaskService,private myRoute:ActivatedRoute , private nav:Router ) { }

  ngOnInit(): void {
    this.myRoute.params.subscribe(
      (Data)=>{
        Data["id"]
        this.taskservice.GetTaskByID(Data["id"]).subscribe(
          (data)=>{this.Task = data},
          (err)=> {if(err.status  == 401) {
            this.nav.navigate(['/login'])
          }}
          
        )
      }
    )
    }
    deleteTask(_type:any)
  {
 
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
        confirmButtonText: 'Yes, Delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.taskservice.DeleteTaskByID(_type.id).subscribe(
            ()=>{},
            (err)=> {if(err.status  == 401) {
              this.nav.navigate(['/login'])
            }}
            
          )
          this.nav.navigate(['/Tasks'])
          .then(() => {
            window.location.reload();
          });
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Task has been Deleted.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.nav.navigate([`info/${_type.id}`]);
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Task Data Not Deleted :)',
            'error'
          )
        }
      })  

    }
  Edit(_type:any) {
    this.nav.navigate([`Edittask/${_type.id}`])
  }
  

}
