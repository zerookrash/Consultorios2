import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent {
    

    constructor( private authService: AuthService,
                  private router: Router ) {}
    private user: UserInterface = {
      username: "",
      password: ""
    }

    onLogin(){
      return this.authService.loginuser(this.user.username, this.user.password)
        .subscribe( 
          data => {
            this.authService.setUser(data.user);
            let token = data.id;
            this.authService.setToken(token);
            if ( data.user.rol == 'administrador' ){
              this.router.navigate(['pages/']);
            } else {
              this.router.navigate(['drs/'])
            }
          },
          err => {
            console.log(err);
             // Alerta de Error
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Usuario y/o contraseña invalidos.',
              text:`${err}`,
              showConfirmButton: false,
              timer: 3500
            })
          }
        );
    }
}