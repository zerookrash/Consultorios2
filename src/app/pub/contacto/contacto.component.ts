import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';

import { Router } from '@angular/router';
import { MsnInterface } from '../../models/msn.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor( public msnService: ContactoService,
               private router: Router) { }


  ngOnInit() {
  }

  contactForm(form) {
    this.msnService.sendMsn(form)
    .subscribe(
      (data:MsnInterface) => {
        // Alerta de Exito
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Hemos recibido su mensaje. ',
          text: 'En poco tiempo nos comunicaremos con usted',
          showConfirmButton: false,
          timer: 2500
        })
        // End Alerta de Exito
        this.msnService.sendMsn(data);
        this.router.navigate(['pub/home']);
      },
      err => {
        // Alerta de Exito
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'Revice que todos los campos esten con la informaciòn correcta.',
          showConfirmButton: false,
          timer: 2500
        })
        console.log(err);
      }
    );
  }

}
