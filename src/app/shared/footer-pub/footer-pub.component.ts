import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-pub',
  templateUrl: './footer-pub.component.html',
  styleUrls: ['./footer-pub.component.css']
})
export class FooterPubComponent implements OnInit {

  anio = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
