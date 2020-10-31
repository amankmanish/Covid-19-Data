import { Component, OnInit } from '@angular/core';

import { GoogleChartInterface } from 'ng2-google-charts';
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
  selectedCountryData ;
  dateWiseData: { };
  dateValue;
  casesValue;
  lineChart : GoogleChartInterface = {
    chartType : 'LineChart' 
  }
  //dataService: any;
  constructor(private service : ServicesService) { }

  ngOnInit(): void {
    this.service.getDateWiseData().subscribe(
      (result)=>{
        this.dateWiseData = result;
        this.updateChart();
        //console.log(result);        
      }
      )
    // this.service.getDateWiseData().subscribe(
    //   (result: any) => {
    //     console.log(result);
    //     console.log("Hello");

    //   }
    // )
    this.service.getGolableData().subscribe(result=>{
      this.data=result;
      this.data.forEach((cs)=>{
        this.countries.push(cs.country); 
      })
    })
  }
  updateChart(){
    let dataTable = [];
    dataTable.push([' Date', 'cases'])
    //console.log(this.selectedCountryData.cs.cases);
    
    this.selectedCountryData.forEach((cs) => {
     
     
      dataTable.push([cs.date,cs.cases])
        //console.log(this.casesValue, this.dateValue);
      
      //console.log(dataTable);
    });
    // ((cs: { cases: any; date: any; }) =>{
    //   console.log(cs.cases);
      
    //   dataTable.push([cs.cases , cs.date]);
    // })
    this.lineChart = {
    chartType: 'LineChart',
      dataTable : dataTable,
      // [
      //   ['Task', 'Hours per Day'],
      //   ['Work', 11],
      //   ['Eat', 2],
      //   ['Commute', 2],
      //   ['Watch TV', 2],
      //   ['Sleep', 7]
      // ],
    
    //firstRowIsData: true,
    options: { 
      height: 500,
     },
  };
    
  }
updateValues(country : string){
  this.data.forEach(cs=>{
    if(cs.country == country){
      this.totalActive=cs.active;
      this.totalDeaths=cs.deaths;
      this.totalRecovered=cs.recovered;
      this.totalConfirmed=cs.confirmed;
    }
 
  })
 this.selectedCountryData = this.dateWiseData[country]
//console.log(this.selectedCountryData);
  //console.log("----------------!!!!!!!!!!!!!!!!!!!!!!!!------------------------");
this.updateChart();
}
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  