import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { CitaInterface } from '../models/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor( private http: HttpClient ) { }

  
  citas: number;
  precio: number;
  citasPendientes = [];
  citasUsr;
  allCitas;

  

  // RESUMEN DEL DIA
  public cargarCitas(){
    return new Promise( () => {
      let token = localStorage.getItem('accessToken');
      let urlApi = `http://localhost:${process.env.PORT}/api/cat_citas2s?access_token=${token}`;
      this.http.get(urlApi)
      .subscribe((res:CitaInterface) => {
        this.citas = 0;
        this.precio = 0;
       Object.values(res).forEach(cita => {
        let fechaDb = moment(cita.fecha_cita).format('D/M/YYYY');
        let hoy = moment(new Date()).format('D/M/YYYY');
        let estado = cita.estadoPago;


        if(fechaDb == hoy && estado == 'PENDIENTE' ){
          this.citas += 1;
          switch (cita.consultorio) {
            case 'MG1':
              this.precio += 200
              break;
            case 'MG2':
              this.precio += 200
              break;
            case 'MG3':
              this.precio += 200
              break;
            case 'MG4':
              this.precio += 200
              break;
            default:
              this.precio += 120
              break;
          }
        }
        
      });
      });
    });
  }

  // CITAS PENDIENTES DE PAGO
  public getAllCitas(){
    let token = localStorage.getItem('accessToken');
    let urlApi = `http://localhost:${process.env.PORT}/api/cat_citas2s?access_token=${token}`;
    this.http.get(urlApi)
    .subscribe((res:any) => {
      this.citasPendientes = res.filter( pendiete => pendiete.estadoPago === 'PENDIENTE' );
      this.citasPendientes.sort( (a, b) => (<any>new Date(a.fecha_cita) - <any>new Date(b.fecha_cita)) );
    })
}



  // DASHBOARD-DRS
  public citaUser( 
    fecha_cita: Date,
     consultorio: string,
     estadoPago: string,
     horaInicio: Date,
     catUsuariosId: string
   ){
     let usr = localStorage.getItem("currentUser");
     let usrJ = JSON.parse(usr);
     let id = usrJ.id;
     let token = localStorage.getItem("accessToken");
     const urlApi = `http://localhost:${process.env.PORT}/api/cat_usuarios/${id}/citas?access_token=${token}`;
     return this.http.post(urlApi, {
        fecha_cita,
        consultorio,
        estadoPago,
        horaInicio,
        catUsuariosId
      })
      .pipe(map(data => {
        data;
        this.getCitas();
      }));
  }
     

  public  getCitas(){
      let usr = localStorage.getItem("currentUser");
      let usrJ = JSON.parse(usr);
      let id = usrJ.id;
      let token = localStorage.getItem("accessToken");
      const urlApi = `http://localhost:${process.env.PORT}/api/cat_usuarios/${id}/citas?access_token=${token}`;
      return this.http.get(urlApi)
        .subscribe((data: CitaInterface) => {
          this.citasUsr = data;
        });
    }
  }