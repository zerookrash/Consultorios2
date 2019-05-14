import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor( private http: HttpClient) { }
  conatCitas;
  ctaCitas = 0;
  monyeCitas = 0;
  visible = false;
  public onRango(fechaInicio: Date, fechaFin: Date){
    let token = localStorage.getItem("accessToken");
    let urlApi = `http://localhost:3000/api/cat_citas2s?filter={%22where%22:{%22fecha_cita%22:{%22between%22:[%22${fechaInicio}%22,%22${fechaFin}%22]}}}&access_token=${token}`;
    return this.http.get(urlApi)
    .subscribe((data: any) =>{
      this.conatCitas = data;
      this.ctaCitas = data.length
      this.monyeCitas = data.length * 120;
      this.visible = true;
    })
  }
}
