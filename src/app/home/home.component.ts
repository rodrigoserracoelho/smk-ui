import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  camelRouteServerUp: boolean = false;
  routes: any[];



  constructor(private homeService: HomeService) {}

  ngOnInit() {

    this.homeService.getCamelRouteServerStatus()
      .subscribe(data => {
        if(data.status === 'UP') {
          this.camelRouteServerUp = true;
        } 
    });

    this.homeService.getCamelDeployedRoutes()
      .subscribe(data => {
        this.routes = data;
    });
  }


  

}