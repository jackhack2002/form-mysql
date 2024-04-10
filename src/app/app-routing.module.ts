import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { GetInfoComponent } from './get-info/get-info.component';

const routes: Routes = [

  {path:'dashboard',component:DashboardComponent,

  children:[
    {path:'student-info',component:StudentInfoComponent},
    {path:'get-info',component:GetInfoComponent},
    {path:'',redirectTo:'student-info',pathMatch:'full'}
  ]

},
  {path:'',redirectTo:'dashboard',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
