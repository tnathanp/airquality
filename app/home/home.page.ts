import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  ngOnInit(){
  }

  constructor(public httpClient: HttpClient) {
  }

  data: Observable<any>;

  Search(ev){
    this.data=this.httpClient.get("https://website-api.airvisual.com/v1/search?q="+ev.target.value+"&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en");
    this.data.subscribe(
        resp=>{ console.log(resp);
      
    }
    )
  }

  eiei(val: string){
    console.log(val);
  }

}
