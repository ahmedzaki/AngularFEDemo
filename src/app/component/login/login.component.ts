import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../services/user.service';
import {Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private _flashMessage:NgFlashMessageService,
  private _service: UserService,
  private _router:Router) {
   }

  ngOnInit() {
  }

  login(){
    if(!this.email || !this.password){
        this._flashMessage.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Must Fill All Fields!!!!"],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: false,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });

      return false;
    }

    const user={
      email: this.email,
      password: this.password
    }
    console.log(user);
    this._service.login(user).subscribe(
      resp => {
        console.log(resp);
        if(!resp.success){
          this._flashMessage.showFlashMessage(
          {messages:[resp.message],
            dismissible: true,timeout: false,type: 'danger'});
            return false;
          }

        this._flashMessage.showFlashMessage(
        {messages:["Logged In Successfullly, Welcome: ", resp.user.name],
          dismissible: true,timeout: false,type: "success"});

          this._service.saveUser(resp.user);
          this._router.navigate(['main']);

      });


  }

}
