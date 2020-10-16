import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService : ServicesService) { }

  ngOnInit(): void {
    this.dataService.getGolableData().subscribe(
      {
        next: (result)=>{
          console.log(result);
        }
      }
    )
   
  }

}


