import { Component } from '@angular/core';
import { filter } from 'minimatch';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capi-ui';

  userProfile: any;
  username: String;
  
  constructor(private keycloak: KeycloakService){
    this.keycloak.loadUserProfile().then(user => {
      console.log(user);
      this.userProfile = user;
      this.username = this.userProfile["username"];
      console.log(this.username);
    })
    
    
  }
  
  

  
  /*login(){
    this.oauthService.initImplicitFlow();
  }*/
  
  /*logout(){
    this.oauthService.logOut();
  }*/




}


