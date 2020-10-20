import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/gloable-data';
//import { from } from 'rxjs';
//import { map } from '../../../node_modules/rxjs/operator';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  //private globalDataUrl ="https://jsonplaceholder.typicode.com/todos";https://raw.githubusercontent.com/amankmanish/Covid-19-Data/main/Data/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2020.csv
  private globalDataUrl ="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv";
  //  "https://raw.githubusercontent.com/amankmanish/Covid-19-Data/main/Data/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv";
  constructor(private Http : HttpClient ) { }
  getGolableData () : Observable <any>{
  
    return this.Http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result)=>{
        let i = 1;
        let data: GlobalDataSummary[] = [];
        let raw ={}
        let rows = result.split('\n');
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/);//https://regexr.com/
          rows.splice (0,1);
          //console.log(cols);  
          let cs={
            country: cols[3],//3
            
            confirmed: + cols[7],//7
            deaths: + cols[8],//8
            recovered: +cols[9],//9
            active: + cols[10],//10
          };
          console.log(cs);
          let temp : GlobalDataSummary = raw[cs.country];
          if(temp){
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;
            raw [cs.country]=temp;
            
          }else{
            raw[cs.country]=cs;
          } 

          //console.log(raw[cs.country]);
        })
        return <GlobalDataSummary[]> Object.values(raw); 
       
      })      
    )
    //return this.Http.get<any>(this.globalDataUrl);//{ withCredentials: true }) as Observable<Type>
  }
}