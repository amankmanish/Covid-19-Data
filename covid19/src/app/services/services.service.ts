import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
//import { from } from 'rxjs';
//import { map } from '../../../node_modules/rxjs/operator';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  //private globalDataUrl ="https://jsonplaceholder.typicode.com/todos";
  private globalDataUrl ="https://raw.githubusercontent.com/amankmanish/Covid-19-Data/main/Data/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv";
  constructor(private Http : HttpClient ) { }
  getGolableData () : Observable <any>{
  
    return this.Http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result)=>{
        return result;
        //console.log(result);
      })      
    )
    //return this.Http.get<any>(this.globalDataUrl);//{ withCredentials: true }) as Observable<Type>
  }
}