import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/gloable-data';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
data : GlobalDataSummary[];
countries : string[] =[];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  constructor(private service : ServicesService) { }

  ngOnInit(): void {
    this.service.getGolableData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country); 
      })
    })
  }
updateValues(country : string){
  this.data.forEach(cs=>{
    if(cs.country == country){
      this.totalActive=cs.active;
      this.totalDeaths=cs.deaths;
      this.totalRecovered=cs.recovered;
      this.totalConfirmed=cs.confirmed;
    }
    // else{
    //   this.totalConfirmed=0
    //   this.totalActive = 0;
    //   this.totalDeaths = 0;
    //   this.totalRecovered = 0;
    // }
  })
}
}
