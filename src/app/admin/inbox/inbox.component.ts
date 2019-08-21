import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

 
  constructor( private mensajes: ContactoService,
                private http: HttpClient ) { 
    mensajes.getMsn();
    
  }

  
  ngOnInit() {
  }
      onRefresh(){
        this.mensajes.getMsn();
      }

      onDelete(id) {
        let urlApi = `http://localhost:3000/api/cat_contactos/${id}`;
        this.http.delete(urlApi).subscribe(data => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Menjase borrado!',
            showConfirmButton: false,
            timer: 2500
          });
          this.mensajes.getMsn();
        }, err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Ocurrio un error',
            text: err,
            showConfirmButton: false,
            timer: 2500
          })
        });
      }

}
