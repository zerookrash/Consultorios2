import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegistroComponent } from './admin/registro/registro.component';
import { ContabilidadComponent } from './admin/contabilidad/contabilidad.component';
import { PagesComponent } from './admin/pages.component';
import { InboxComponent } from './admin/inbox/inbox.component';

import { LoginComponent } from './pub/login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { HomeComponent } from './pub/home/home.component';
import { FaqsComponent } from './pub/faqs/faqs.component';
import { ContactoComponent } from './pub/contacto/contacto.component';
import { PubComponent } from './pub/pub.component';

import { PagesDrsComponent } from './drs/pages-drs.component';
import { DashbordDrsComponent } from './drs/dashbord-drs/dashbord-drs.component';

const routes: Routes = [
  { path: 'pub',
    component: PubComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'faqs', component: FaqsComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'login', component: LoginComponent }
  ]},
  { path: 'pages',
  component: PagesComponent,
  children: [
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [AuthGuard]
     },
    { 
      path: 'registro', 
      component: RegistroComponent, 
      canActivate: [AuthGuard]
    },
    { 
      path: 'contabilidad', 
      component: ContabilidadComponent, 
      canActivate: [AuthGuard]
    },
    {
      path: 'inbox',
      component: InboxComponent,
      canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},
  {
    path: 'drs',
    component: PagesDrsComponent,
    children: [
      {
        path: 'dashboard-drs',
        component: DashbordDrsComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: 'dashboard-drs', pathMatch: 'full'}
    ]
  },
  { path: '', redirectTo: 'pub/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
