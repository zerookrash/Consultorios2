import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import * as moment from 'moment';
import { FechasInterface } from '../../models/fechas.interface';
import { ContabilidadService } from '../../services/contabilidad.service';
import { HttpClient } from '@angular/common/http';
import { CitaInterface } from 'src/app/models/cita.interface';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  moment = moment.locale('es');
  hoy = moment().format('D MMM YY');
  private fechas: FechasInterface = {
    fechaInicio: new Date,
    fechaFinal: new Date
  }
  constructor( private contabilidadService: ContabilidadService,
                private http: HttpClient ) {

   }

  ngOnInit() {
  }

  onDateParam(form: NgForm): void{

    if(form.valid){
      this.contabilidadService.onRango(
        this.fechas.fechaInicio, 
        this.fechas.fechaFinal)
    }
      

  }

  citaMd;
  public onPago(id){
    let token = localStorage.getItem('accessToken');
    this.http.get(`http://localhost:3000/api/cat_citas/${id}?access_token=${token}`)
    .subscribe((res:CitaInterface) => {
      res.estadoPago = 'PAGADO'
      this.citaMd = res
      this.http.put(`http://localhost:3000/api/cat_usuarios/${this.citaMd.catUsuariosId}/citas/${this.citaMd.id}?access_token=${token}`, this.citaMd)
      .subscribe( data => data);
      location.reload();
    });
  }

}
