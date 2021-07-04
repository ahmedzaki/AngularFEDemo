import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../services/user.service';
import {Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string;
  email: string;
  password : string;

  constructor(private _flashMessage:NgFlashMessageService,
  private _service: UserService,
  private _router:Router) {
  // this.name = "Ahmed";
 }

  ngOnInit() {
  }

  onRegister(){
    if(!this.email || !this.name || !this.password){
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
      name:this.name,
      email: this.email,
      password: this.password
    }
    this._service.register(user).subscribe(
      resp => {
        console.log(resp);
        if(!resp.success){
          this._flashMessage.showFlashMessage(
          {messages:[resp.message],
            dismissible: true,timeout: false,type: 'danger'});
            return false;
          }

        this._flashMessage.showFlashMessage(
        {messages:["User Created"],
          dismissible: true,timeout: false,type: "success"});

      });
      this._router.navigate(["/login"]);
  }
}
