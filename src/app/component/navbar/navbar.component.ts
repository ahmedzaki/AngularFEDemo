import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _service: UserService,
  private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._service.logout();
    this._router.navigate(['login']);
  }
}
