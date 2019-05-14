import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../models/user-interface';

@Component({
  selector: 'app-sidebar-drs',
  templateUrl: './sidebar-drs.component.html',
  styleUrls: ['./sidebar-drs.component.css']
})
export class SidebarDrsComponent implements OnInit {

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
