import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})

export class TasksComponent implements OnInit {
  constructor(private taskservice:TaskService, private nav:Router ) { }
  Tasks:any;
  mySub :any;
  closeResult: string="";
  ngOnInit(): void {
    
    this.mySub = this.taskservice.GetAllTasks().subscribe(
      (data)=>{this.Tasks = data},
      
      (err)=> {
        if(err.status  == 401) {
        this.nav.navigate(['/login'])

      }}
    )}

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
            ()=> console.log(`Task with id = ${_type.id} deleted`) ,
            (err)=> {
              if(err.status  == 401) {
              this.nav.navigate(['/login'])
            }}
            
          )
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Task has been Deleted.',
            'success'
          )
          if(result.isConfirmed){
            this.mySub = this.taskservice.GetAllTasks().subscribe(
              (data)=>{this.Tasks = data},
              
              (err)=> {
                if(err.status  == 401) {
                this.nav.navigate(['/login'])
              }}
            )
            this.nav.navigate(['/Tasks'])
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.nav.navigate([`Tasks`]);
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Task Data Not Deleted :)',
            'error'
          )
        }
      })  
    }

  gOnDestroy(): void {
    this.Tasks=[];
    this.mySub.unsubscribe();
  }
  
}

