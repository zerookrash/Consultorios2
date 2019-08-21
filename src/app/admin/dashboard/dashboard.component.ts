import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CitasService } from '../../services/citas.service';
import { CitaInterface } from 'src/app/models/cita.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 


  constructor( 
    private citasServices: CitasService,
    private http: HttpClient
    ) {
    citasServices.cargarCitas();
    citasServices.getAllCitas();
  }
  
  ngOnInit() {
    
  }

  citaMd;
  public onPago(id){
    let token = localStorage.getItem('accessToken');
    this.http.get(`http://localhost:${process.env.PORT}/api/cat_citas2s/${id}?access_token=${token}`)
    .subscribe((res:CitaInterface) => {
      res.estadoPago = 'PAGADO'
      this.citaMd = res;
      this.http.put(`http://localhost:${process.env.PORT}/api/cat_usuarios/${this.citaMd.catUsuariosId}/citas/${this.citaMd.id}?access_token=${token}`, this.citaMd)
      .subscribe( data => data);
      setTimeout(() => {
        this.citasServices.getAllCitas();
      },500);
    });
  }
}
