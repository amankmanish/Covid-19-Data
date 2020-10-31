import { Component, Input, OnInit } from '@angular/core';
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
  dataTable = [];

  globalData : GlobalDataSummary[];
  pieChart : GoogleChartInterface = {
    chartType: 'pieChart'
  }
  columnChart :GoogleChartInterface ={
    chartType:'columnChart'
  }

     
  constructor(private dataService : ServicesService) { }
  initChart(caseType: string){
    let dataTable = [] ;
    dataTable.push(["Country","Cases"])
    this.globalData.forEach(cs=>{

      let values :Number ;
      if(caseType == 'c'){
        if(cs.confirmed > 20000){
          console.log(cs.confirmed);
          //console.log(cs.country);
          values = cs.confirmed;
        }
      }
      if (caseType == 'd') {
          if (cs.deaths > 20000) {
            console.log(cs.deaths);
            values = cs.deaths;
          }
      }
      if (caseType == 'r') {
        if (cs.recovered > 20000) {
          console.log(cs.recovered);
          values = cs.recovered;
        }
      }
      if (caseType == 'a') {
          if (cs.active > 20000) {
            values= cs.active;
          }  
      }
      dataTable.push([cs.country, values])   
    })
    this.pieChart  = {
      chartType: 'PieChart',
      dataTable:dataTable, 
      //firstRowIsData: true,
      options: { 'Country': 'Cases',
      height :400 , 
      width : 500
    },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
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
          result.forEach((cs: { confirmed: any; active: number; deaths: number; recovered: number; })  => {
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths +=cs.deaths;
              this.totalRecovered += cs.recovered;
            }
            
          });

          this.initChart("c");
        }
      }
    )
   
  }
  //let input  : any;

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    //this.fun(input.value);
    this.initChart(input.value);
  } 
}


