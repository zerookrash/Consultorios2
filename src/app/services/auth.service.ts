import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map, catchError, retry } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import { UserInterface } from "../models/user-interface";
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });



  registerUser( rol: string, realm: string, username: string, password: string, email: string, especialidad: string, telefono: string, consultorio:string, contrato: string, expira: Date, alta: Date ) {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://134.209.76.197:4001/api/cat_usuarios?access_token=${accessToken}`;
      return this.http
      .post(
        url_api,
        {
          rol,
          especialidad,
          telefono,
          consultorio,
          contrato,
          expira,
          alta,
          realm,
          username,
          email,
          password
        },
        { headers: this.headers }
      )
      .pipe(
        map(data => data),
        catchError(this.handleError)
        );
  }

  handleError(error){
    let errorMessage = "";
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
      errorMessage = `Error Code: ${error.status} Usuario duplicado.`;
    }
    // window.alert(errorMessage);
    Swal.fire({
      position: 'center',
      type: 'error',
      title: 'Nuevo usuario NO se pudo registrar.',
      text: `${errorMessage}`,
      showConfirmButton: true
    });
    return throwError(errorMessage);
  }







  loginuser(username: string, password: string): Observable<any> {
    const url_api = "http://134.209.76.197:4001/api/cat_usuarios/login?include=user";
    const data = { username, password };
    return this.http
      .post<UserInterface>(
        url_api,
        data
      )
      .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://134.209.76.197:4001/api/cat_usuarios/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }
}