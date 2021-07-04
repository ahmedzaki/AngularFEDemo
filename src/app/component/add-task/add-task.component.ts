import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

import {Router } from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  name:string;
  done:boolean;
  owner:string;

  constructor(private _flashMessage:NgFlashMessageService,
  private _userService: UserService,
  private _taskService: TaskService,
  private _router:Router) {
  // this.name = "Ahmed";
 }
  ngOnInit() {
    const user = this._userService.getCurrentUser();
    this.owner = user.id;
    this.done=false;
  }

  onAddTask(){

    const task={
      name: this.name,
      done: this.done,
      owner: this.owner
    }

    if( !this.name ){
        this._flashMessage.showFlashMessage({
        messages: ["Must Fill All Fields!!!!"],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });

      return false;
    }

    this._taskService.addTask(task).subscribe(
      resp => {
        console.log(resp);
        if(!resp.success){
          this._flashMessage.showFlashMessage(
          {messages:[resp.message],
            dismissible: true,timeout: false,type: 'danger'});
            return false;
          }

        this._flashMessage.showFlashMessage(
        {messages:["Task Created"],
          dismissible: true,timeout: false,type: "success"});
          this._router.navigate(["main"]);

      });

  }

}
