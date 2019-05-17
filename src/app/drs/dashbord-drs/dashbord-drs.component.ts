import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CitaInterface } from '../../models/cita.interface';
import { CitasService } from '../../services/citas.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';



@Component({
  selector: 'app-dashbord-drs',
  templateUrl: './dashbord-drs.component.html',
  styleUrls: ['./dashbord-drs.component.css']
})
export class DashbordDrsComponent implements OnInit {
  user: any = this.authService.getCurrentUser();
  espDrs: Boolean = false;
  espPs: Boolean = false;
  espSj: Boolean = false;
  especialidad = this.user.especialidad;
  mensaje: Boolean = false;
  
  constructor(
    private authService: AuthService,
    private citasServices: CitasService,
    private http: HttpClient ) {
      citasServices.getCitas();
      this.onRol();
    }  
    moment = moment.locale('es');
    
    ngOnInit() { 
  }
  
   

   public reg_cita = {
     fechaCita: new Date(),
     consultorio: "",
     estadoPago: "PENDIENTE",
     horaInicio: new Date(),
     catUsuariosId: ""
   }

  

   onRol(){
    let hoy = new Date();
    let token = localStorage.getItem("accessToken");
    let id = this.user.id;
    let urlApi = `http://localhost:3000/api/cat_usuarios/${id}/citas?access_token=${token}`;
    this.http.get(urlApi).subscribe((res:any) => {
      if(res){
        res.forEach(element => {
          let fechaDb = moment(element.fecha_cita).format('YYYY MM DD');
          let fechaHoy = moment(hoy).format('YYYY MM DD');
  
          if(fechaDb < fechaHoy && element.estadoPago == 'PENDIENTE') {
              this.especialidad = 'Adeudo';
            } else {
              this.especialidad = this.user.especialidad;
            } 
          });
      } else {
        console.log('No hay data');
      }
            switch (this.especialidad) {
              case 'Medicina General':
                this.espDrs = true;
                break;
              case 'Psicología':
                this.espPs = true;
                break;
              case 'Sala de Juntas':
                this.espSj = true;
                break;
              case 'Medicina General y Sala de Juntas':
                this.espDrs = true;
                this.espSj = true;
                break;
                case 'Psicología y Sala de Juntas':
                this.espPs = true;
                this.espSj = true;
                break;
                case 'Adeudo':
                this.mensaje = true;
                break;
              default:
                break;
            }
    });   
  }



   onCita(){

    let token = localStorage.getItem("accessToken");
    let urlApi = `http://localhost:3000/api/cat_citas2s/reservas-hoy?fecha=${this.reg_cita.fechaCita}&access_token=${token}`;
    this.http.get(urlApi)
    .subscribe( (res:any) => {

      this.reg_cita.horaInicio = this.reg_cita.fechaCita

      let hoy = moment(new Date()).format('DD/M/YYYY');
      let fechaCita = moment(this.reg_cita.fechaCita).format('DD/M/YYYY');

      let horaActual = new Date().getTime();
      let horaCita = new Date(this.reg_cita.horaInicio).getTime();

      let diaCita = moment(this.reg_cita.fechaCita).format('dddd');
      let horaInicio = moment('08:59', 'HH:mm').format('HH:mm');
      let horaFinal = moment('21:00', 'HH:mm').format('HH:mm');
      let horaFinalS = moment('16:00', 'HH:mm').format('HH:mm');
   
    if(!this.reg_cita.consultorio){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Especifique un consultorio',
        showConfirmButton: false,
        timer: 2500
      })
    } else if( fechaCita < hoy){
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Fecha invalida',
        showConfirmButton: false,
        timer: 2500
      })
    } else if(horaCita < horaActual) {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Hora invalida',
        showConfirmButton: false,
        timer: 2500
      })
    } else {

     console.log('Valido!');
    }
    });

   }

  

  onDelete(id, fk) {
    let token = localStorage.getItem("accessToken");
    let urlCita = `http://localhost:3000/api/cat_usuarios/${id}/citas/${fk}?access_token=${token}`;
    this.http.get(urlCita).subscribe( (res:CitaInterface) => {

      let hoy = moment(new Date());
      let citaFecha = moment(res.horaInicio);

      if(citaFecha.diff(hoy, 'hours') < 24 || res.estadoPago == 'PAGADO'){
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'No puedes eliminar esta cita.',
          text: 'Ya esta pagada o falta menos de 24hrs',
          showConfirmButton: false,
          timer: 2500
        })
      } else {

        let urlApi = `http://localhost:3000/api/cat_usuarios/${id}/citas/${fk}?access_token=${token}`;
          this.http.delete(urlApi).subscribe( res => {
            res;
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Cita eliminada con exito.',
              showConfirmButton: false,
              timer: 2500
            })
          this.citasServices.getCitas();
          })

      }


    })
  }
}
      
      