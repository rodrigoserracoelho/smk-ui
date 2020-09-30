import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { initializer } from './sso.config';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlErrorsDirective } from './control-error/control-errors.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error/control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import {MatTableModule} from '@angular/material/table';
import { ListCountriesComponent } from './listcountries/listcountries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCountriesComponent,
    ControlErrorsDirective, 
    ControlErrorComponent, 
    ControlErrorContainerDirective, 
    FormSubmitDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  exports: [
    MatTableModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ControlErrorComponent]
})
export class AppModule { }