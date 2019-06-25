import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitasService } from './citas.service';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor( private http: HttpClient,
               private citasService: CitasService) { 
                 this.citasService.cargarCitas()
                }
  conatCitas;
  ctaCitas = 0;
  monyeCitas = 0;
  visible = false;
  citaPagada = [];


  public onRango(fechaInicio:Date, fechaFin:Date){
    let token = localStorage.getItem("accessToken");
    let urlApi = `http://134.209.76.197:4001/api/cat_citas2s?filter={%22where%22:{%22fecha_cita%22:{%22between%22:[%22${fechaInicio}%22,%22${fechaFin}%22]}}}&access_token=${token}`;
    return this.http.get(urlApi)
    .subscribe((res: any) =>{
      this.visible = true;
      this.citaPagada = res.filter( pagadas => pagadas.estadoPago == 'PAGADO' );
      this.citaPagada.sort( (a, b) => (<any>new Date(a.fecha_cita) - <any>new Date(b.fecha_cita)) )
      this.ctaCitas = this.citaPagada.length;
      this.monyeCitas = 0;

      this.citaPagada.forEach(cita => {
        switch (cita.consultorio) {
          case 'MG1':
            this.monyeCitas += 200
            break;
          case 'MG2':
            this.monyeCitas += 200
            break;
          case 'MG3':
            this.monyeCitas += 200
            break;
          case 'MG4':
            this.monyeCitas += 200
            break;
          default:
            this.monyeCitas += 120
            break;
        }
      });
      
    })
  }
}
