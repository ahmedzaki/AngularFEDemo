import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) {
 }

 // createAuthHeader(headers: HttpHeaders){
 //    const token = localStorage.getItem("AUTH_TOKEN");
 //    headers = headers.set('Authorization', `Bearer ${token}`);
 //  }

 addTask(task){
   interface AddTaskReponse {
     success: boolean,
     message: string,
     task:{
       name: string,
       done: boolean,
       owner: string
     }
   }
   let headers = new HttpHeaders();

   // this.createAuthHeader(headers);
   const token = localStorage.getItem("AUTH_TOKEN");
   headers = headers.set('Authorization', `Bearer ${token}`);

   console.log(headers);
   return this._http.post<AddTaskReponse>("/tasks/add", task, {headers});
 }

 getTasks(query){
   interface getTasksReponse {
     success: boolean,
     message: string,
     tasks:[{
       name: string,
       done: boolean,
       owner: string
     }]
   }
   let headers = new HttpHeaders();

   // this.createAuthHeader(headers);
   const token = localStorage.getItem("AUTH_TOKEN");
   headers = headers.set('Authorization', `Bearer ${token}`);

   console.log(headers);
   return this._http.post<getTasksReponse>("/tasks/list", query, {headers});
 }

 removeTask(taskId){
   interface deleteTasksReponse {
     success: boolean,
     message: string
   }
   let headers = new HttpHeaders();

   // this.createAuthHeader(headers);
   const token = localStorage.getItem("AUTH_TOKEN");
   headers = headers.set('Authorization', `Bearer ${token}`);

   console.log(headers);
   return this._http.delete<deleteTasksReponse>(`/tasks/remove/${taskId}`, {headers});
 }

}
