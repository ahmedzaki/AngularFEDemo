import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { MainComponent } from './component/main/main.component';
import { AddTaskComponent } from './component/add-task/add-task.component';

import {UserService} from './services/user.service';
import {TaskService} from './services/task.service';


import { AuthGuard } from './guard/auth.guard';

const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'main', component:MainComponent , canActivate:[AuthGuard]},
  {path:'addTask', component:AddTaskComponent , canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgFlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    UserService,
    TaskService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
