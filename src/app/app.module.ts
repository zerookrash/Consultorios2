import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Graficas
import { ChartsModule } from 'ng2-charts';

// TimePicker
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegistroComponent } from './admin/registro/registro.component';
import { ContabilidadComponent } from './admin/contabilidad/contabilidad.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pub/login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './admin/pages.component';
import { HomeComponent } from './pub/home/home.component';
import { FaqsComponent } from './pub/faqs/faqs.component';
import { ContactoComponent } from './pub/contacto/contacto.component';
import { PubComponent } from './pub/pub.component';
import { FooterPubComponent } from './shared/footer-pub/footer-pub.component';
import { SliderComponent } from './shared/slider/slider.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GraficasComponent } from './shared/graficas/graficas.component';
import { InboxComponent } from './admin/inbox/inbox.component';
import { DashbordDrsComponent } from './drs/dashbord-drs/dashbord-drs.component';
import { PagesDrsComponent } from './drs/pages-drs.component';
import { SidebarDrsComponent } from './shared/sidebar-drs/sidebar-drs.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    BreadCrumbComponent,
    DashboardComponent,
    RegistroComponent,
    ContabilidadComponent,
    FooterComponent,
    LoginComponent,
    NopagefoundComponent,
    PagesComponent,
    HomeComponent,
    FaqsComponent,
    ContactoComponent,
    PubComponent,
    FooterPubComponent,
    SliderComponent,
    NavbarComponent,
    GraficasComponent,
    InboxComponent,
    DashbordDrsComponent,
    PagesDrsComponent,
    SidebarDrsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
