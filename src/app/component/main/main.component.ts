import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

import {Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  tasks:any;

  constructor(private _flashMessage:NgFlashMessageService,
    private _service: UserService,
    private _taskService: TaskService,
    private _router:Router)
 { }

  ngOnInit() {
    this.getTasks();
  }

  onAddTask(){
    this._router.navigate(['addTask']);
  }

  getTasks(){
    const owner = this._service.getCurrentUser();
    console.log(owner);
    const id = owner.id;
    const task={
      owner:id
    }
    this._taskService.getTasks(task).subscribe(
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

          console.log(resp);
          this.tasks = resp.tasks;

      });
    }

    onDelete(taskId){

      this._taskService.removeTask(taskId).subscribe(
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

            this.getTasks();
            this._router.navigate(["main"]);

            console.log(resp);
        });
    }
  }
