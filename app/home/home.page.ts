import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  data: Observable<any>;
  return: Observable<any>;
  _return: Observable<any>;
  bg: string = '';
  aqi: number;
  name: string;
  pm25: string;
  pm10: string;
  level: string;
  isFetching: boolean = false;
  isLogin: boolean;
  isSaved: boolean;

  constructor(public httpClient: HttpClient, private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { this.onRouteChange(); }
    });
  }

  onRouteChange() {
    this.bg = localStorage.getItem("bg");
    this.checkplaces();
    this.fetch(localStorage.getItem("search_id"), localStorage.getItem("search_type"));
  }

  ngOnInit() {
    this.checkplaces();
    localStorage.setItem("bg", '');
    localStorage.setItem("search_id", "WJv6Pqdvj8ph9xkuZ");
    localStorage.setItem("search_type", "cities");
    localStorage.setItem("search_name", "Bangkok");
  }


  fetch(query: string, type: string) {
    this.isFetching = true;
    this.data = this.httpClient.get("http://airqualityapi.herokuapp.com/fetch?q=" + query + "&t=" + type);
    this.data.subscribe(
      resp => {
        this.name = resp.breadcrumbs[resp.breadcrumbs.length - 1].label;
        if (this.name.split(' ').length >= 6) {
          var temp = this.name.split(' ');
          this.name = temp[0] + " " + temp[1] + " " + temp[2] + " ... " + temp[temp.length - 2] + " " + temp[temp.length - 1];
        }
        var aqi = resp.current.aqi;
        this.aqi = aqi;
        if (resp.current.pm25 !== undefined) { this.pm25 = resp.current.pm25.concentration; } else { this.pm25 = undefined; }
        if (resp.current.pm10 !== undefined) { this.pm10 = resp.current.pm25.concentration; } else { this.pm10 = undefined; }
        if (aqi >= 0 && aqi <= 50) {
          this.level = "Good";
          localStorage.setItem("bg", "level1");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        } else if (aqi >= 51 && aqi <= 100) {
          this.level = "Moderate";
          localStorage.setItem("bg", "level2");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        } else if (aqi >= 101 && aqi <= 150) {
          this.level = "Unhealthy for Sensitive Groups";
          localStorage.setItem("bg", "level3");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        } else if (aqi >= 151 && aqi <= 200) {
          this.level = "Unhealthy";
          localStorage.setItem("bg", "level4");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        } else if (aqi >= 201 && aqi <= 300) {
          this.level = "Very Unhealthy";
          localStorage.setItem("bg", "level5");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        } else if (aqi >= 301) {
          this.level = "Hazardous";
          localStorage.setItem("bg", "level6");
          this.bg = localStorage.getItem("bg");
          this.isFetching = false;
        }
      }
    )
  }

  checkplaces() {
    var id = localStorage.getItem("search_id");
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (this.isLogin == true) {
      this.return = this.httpClient.get("http://airqualityapi.herokuapp.com/fetchplaces?username=" + localStorage.getItem("isLoginAs"));
      this.return.subscribe(
        resp => {
          if (Object.keys(resp).length != 0) {
            for (var i = 0; i < resp.places.length; i++) {
              if (resp.places[i].id == localStorage.getItem("search_id")) { this.isSaved = true; break; } else { this.isSaved = false; }
            }
          } else {
            this.isSaved = false;
          }
        }
      )
    }
  }

  addplaces() {
    this._return = this.httpClient.get("http://airqualityapi.herokuapp.com/addplaces?username=" + localStorage.getItem("isLoginAs") + "&name=" + localStorage.getItem("search_name") + "&id=" + localStorage.getItem("search_id") + "&t=" + localStorage.getItem("search_type"));
    this._return.subscribe(resp => { console.log(resp); })
    this.isSaved = true;
  }

}
