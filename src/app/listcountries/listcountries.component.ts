import { Component, OnInit } from '@angular/core';
import { ListCountryService } from './listcountries.service';

@Component({
  selector: 'app-listapis',
  templateUrl: './listcountries.component.html',
  styleUrls: ['./listcountries.component.css']
})

export class ListCountriesComponent implements OnInit { 

  displayedColumns: string[] = ['iso', 'name', 'printableName', 'iso3'];
  dataSource;

  constructor(private countryService: ListCountryService) { }

  ngOnInit() {
    this.countryService.getCountries()
    .subscribe(data => {
      this.dataSource = data;
    });
  } 
}