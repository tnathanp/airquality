import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  query: string;
  showCities: boolean = true;
  showPlaces: boolean = true;

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }

  data: Observable<any>;

  search(ev) {
    this.data = this.httpClient.get("https://airqualityapi.herokuapp.com/search?q=" + ev.target.value);
  }

  segmentChanged(ev) {
    if(ev.target.value == "all") {this.showCities = true; this.showPlaces = true}
    else if(ev.target.value == "cities") {this.showCities = true; this.showPlaces = false}
    else {this.showCities = false; this.showPlaces = true}
  }

  pushSearch(id: string, type: string, name: string) {
    localStorage.setItem("search_id", id);
    localStorage.setItem("search_type", type);
    localStorage.setItem("search_name", name);
  }

}
