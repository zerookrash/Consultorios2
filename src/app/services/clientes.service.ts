import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient ) { }

  allClientes: UserInterface;

  public usrs (){
    let token = localStorage.getItem("accessToken");
    let urlApi = `http://localhost:3000/api/cat_usuarios?access_token=${token}`;
    return new Promise(() => {
      this.http.get(urlApi)
      .subscribe( (res: UserInterface) => {
        this.allClientes = res;
      });
    });
  }
}
