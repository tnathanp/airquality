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

  search(ev) {
    this.data = this.httpClient.get("https://website-api.airvisual.com/v1/search?q=" + ev.target.value + "&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en");
  }

  pushSearch(id: string, type: string, name: string) {
    localStorage.setItem("search_id", id);
    localStorage.setItem("search_type", type);
    localStorage.setItem("search_name", name);
  }

}
