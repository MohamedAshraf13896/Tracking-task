import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  token:any
  nav: any;
  constructor() { 
    this.token = localStorage.getItem("User")
  }

  ngOnInit(): void {
  }

  removeuser() {
    localStorage.removeItem("User")
    this.token = "";
    this.ngOnInit();
  }

}
