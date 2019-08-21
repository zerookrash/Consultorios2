import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { MsnInterface } from '../models/msn.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor( private http: HttpClient ) { }

  msns: MsnInterface;

  sendMsn( body ){
    const url_api = `http://localhost:${process.env.PORT}/api/cat_contactos`;
    return this.http
      .post(url_api, body)
      .pipe(map(data => data));
  }

  getMsn(){
    return new Promise( () => {
      this.http.get('http://localhost:${process.env.PORT}/api/cat_contactos')
        .subscribe((res: MsnInterface)=>{
          this.msns = res.reverse();
        });
    });
  }
}
