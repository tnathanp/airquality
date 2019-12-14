import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }

  data: Observable<any>;

  Search(ev){
    this.data=this.httpClient.get("https://website-api.airvisual.com/v1/search?q="+ev.target.value+"&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en");
    this.data.subscribe(
        resp=>{ console.log(resp);  
    }
    )
  }

}
