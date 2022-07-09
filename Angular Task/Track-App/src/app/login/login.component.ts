import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  nav: any;

  constructor(private loginservice:LoginService) { }
  LoginForm!: FormGroup;
  submited:boolean = false;
  Error:any
  Token:any
  ngOnInit(): void {

    this.LoginForm = new FormGroup({
      userName: new FormControl("",[Validators.required ,  Validators.minLength(3) , Validators.maxLength(10), Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")]),
      password: new FormControl ("",[Validators.required , Validators.minLength(7) , Validators.maxLength(20) , Validators.pattern("^(?![0-9]*$)[a-zA-Z0-9A-Za-z0-9_@./#&+-]+$")])
    })
  }

  Login(userName:string, password:string) {
    this.submited = true;
    console.log(this.submited , this.LoginForm)
    if(this.LoginForm.valid) {
      let User = { userName, password};
      if(userName && password){
       this.loginservice.Login(User).subscribe(
        (data)=>{this.Token =data
          localStorage.setItem("User",this.Token.token)
          Swal.fire({
            icon: 'success',
            title: 'Welcome...',
            text: 'Valid User :)',
            footer: '<a href="">Congratulations</a>'
          }).then((result)=> {
            if(result.isConfirmed)  {
              this.nav.navigate[`/Tasks`].then(() => {
                window.location.reload();
              });
            }
          })
        },
        (error)=>{this.Error = error.error}
       );
      }

    }
  }

}
