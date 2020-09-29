import { Component, OnInit } from '@angular/core';
import { ListApisService } from './listapis.service';

@Component({
  selector: 'app-listapis',
  templateUrl: './listapis.component.html',
  styleUrls: ['./listapis.component.css']
})

export class ListApisComponent implements OnInit { 

  displayedColumns: string[] = ['id', 'name', 'context', 'endpointType', 'secured', 'corsEnabled'];
  dataSource;

  constructor(private apiService: ListApisService) { }

  ngOnInit() {
    this.apiService.getApis()
    .subscribe(data => {
      this.dataSource = data;
    });
  } 
}