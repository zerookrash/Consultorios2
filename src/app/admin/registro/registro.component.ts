import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

import { ClientesInterface } from '../../models/clientes-interface';
import Swal from 'sweetalert2';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  moment = moment.locale('es');
  private reg_user: any = {
    rol: "",
    especialidad: "",
    telefono: "",
    consultorio: "Sin Consultorio Asignado",
    contrato: "",
    alta: new Date(),
    expira: new Date(),
    realm: "",
    username: "",
    email: "",
    password: ""
  }
  public exp = moment(this.reg_user.expira).add(1, 'year').format('D / MM YYYY');
  public exp2 = moment(this.reg_user.expira).add(1, 'year').format().toString();
  public alt = moment(this.reg_user.alta).format('D / MM / YYYY');
  
  constructor( 
    private authService: AuthService,
    private clientes: ClientesService
    ) {
      clientes.usrs();
    }
    ngOnInit() {
      console.log(this.exp);
      
    }


  
  onRegister(form: NgForm): void{
    this.reg_user.expira = this.exp2
    if(form.valid) {
      this.authService
        .registerUser(
          this.reg_user.rol,
          this.reg_user.realm,
          this.reg_user.username,
          this.reg_user.password,
          this.reg_user.email,
          this.reg_user.especialidad,
          this.reg_user.telefono,
          this.reg_user.consultorio,
          this.reg_user.contrato,
          this.reg_user.expira,
          this.reg_user.alta
        )
        .subscribe( data => {
          // Alerta
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Nuevo usuario registrado con exito.',
            showConfirmButton: false,
            timer: 2500
          })
          // End Alerta
          this.clientes.usrs();
        })
    } else {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Nuevo usuario NO se pudo registrar.',
        showConfirmButton: false,
        timer: 2500
      })
    }
    setTimeout(() => {
      this.clientes.usrs();
    }, 2000);
    
  }   
}
