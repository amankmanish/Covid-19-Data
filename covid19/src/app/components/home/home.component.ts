import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/gloable-data';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed =0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType: 'pieChart'
  }
  columnChart :GoogleChartInterface ={
    chartType:'columnChart'
  }
     
  constructor(private dataService : ServicesService) { }
  initChart(caseType: string){
    let datatable = [] ;
    datatable.push(["Country","Cases"])
    this.globalData.forEach(cs=>{
      let value : Number;
      if(caseType == 'c'){
        if(cs.confirmed > 2000){
          //console.log(cs.confirmed);
          //console.log(cs.country);
          value = cs.confirmed;
        }
      }
      if (caseType == 'd') {
        if (cs.confirmed > 2000) {
          value = cs.deaths;
        }
      }
      if (caseType == 'r') {
        if (cs.confirmed > 2000) {
          value = cs.recovered;
        }
      }
      if (caseType == 'a') {
        if (cs.confirmed > 2000) {
          value = cs.active;
        }
      }
      datatable.push([
         // console.log(value),
         // console.log(cs.country),           
          cs.country, value
        ])   
    })
   // console.log(datatable);
    
    this.pieChart  = {
      chartType: 'PieChart',
      dataTable:datatable, 
      //firstRowIsData: true,
      options: { 'Country': 'Cases',
      height :400 },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        'Country': 'Cases',

        height: 400
      },
    };
  }

  ngOnInit(): void {
    this.dataService.getGolableData().subscribe(
      {
        next: (result)=>{
          //console.log(result);
          this.globalData = result;
          result.forEach(cs  => {
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths +=cs.deaths;
              this.totalRecovered += cs.recovered;
            }
            
          });
          this.initChart('c');
        }
      }
    )
   
  }
  updateChart(input : HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value);
  }

}


