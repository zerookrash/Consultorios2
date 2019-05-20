import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesInterface } from '../models/clientes-interface';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

  cliente: ClientesInterface[] = [];

  constructor( private http: HttpClient ) { 
    
  }
  
  public cargarClientes(){
    return new Promise( (res, rej) => {
      let token = localStorage.getItem('accessToken');
      this.http.get(`http://localhost:8061/api/cat_usuarios?access_token=${token}`)
      .subscribe(( res: ClientesInterface[] ) => {
        this.cliente = res;
        console.log(this.cliente);
      });
    });
  }
 

}
