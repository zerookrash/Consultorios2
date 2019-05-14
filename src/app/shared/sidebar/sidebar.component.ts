import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  user: UserInterface;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  onLogOut(): void{
    this.authService.logoutUser();
    this.router.navigate(['pub/home']);
  }


  

}
