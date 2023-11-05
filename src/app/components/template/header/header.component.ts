import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
 public user:any
 public user_name:any
  constructor() {

    this.user = sessionStorage.getItem('userData');
    this.user = JSON.parse(this.user);
    this.user_name = this.user.res.full_name
    console.log(this.user_name)
   }

  ngOnInit() {

  }



}
