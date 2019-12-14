import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-fav',
  templateUrl: 'fav.page.html',
  styleUrls: ['fav.page.scss']
})
export class FavPage {

  isLogin: boolean = false;
  isAdded: boolean = false;
  isLoading: boolean = true;
  isFetching: boolean = false;
  account: string = '';
  bg: string = 'default';
  location: string;
  selected: string = '';
  aqi: number;
  pm25: string;
  pm10: string;
  level: string;
  isFirst: boolean = true;

  constructor(public httpClient: HttpClient) { }

  return: Observable<any>;
  fetch: Observable<any>;

  ngOnInit() {
    localStorage.setItem("selected", '');
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    this.account = localStorage.getItem("isLoginAs");
    this.selected = localStorage.getItem("selected");
    this.return = this.httpClient.get("http://airqualityapi.herokuapp.com/fetchplaces?username=" + this.account);
    this.return.subscribe(
      resp => {
        if (Object.keys(resp).length == 0) {
          this.isAdded = false;
        } else {
          this.isAdded = true;
        }
        this.isLoading = false;
      })
  }

  showData(param: string) {
    this.isFetching = true;
    this.isFirst = false;
    var id = param.split(',')[0];
    var types = param.split(',')[1];
    this.selected = param.split(',')[2];
    localStorage.setItem("selected", this.selected);
    this.fetch = this.httpClient.get("http://airqualityapi.herokuapp.com/fetch?q=" + id + "&t=" + types);
    this.fetch.subscribe(
      resp => {
        var aqi = resp.current.aqi;
        this.aqi = aqi;
        if (resp.current.pm25 !== undefined) { this.pm25 = resp.current.pm25.concentration; } else { this.pm25 = undefined; }
        if (resp.current.pm10 !== undefined) { this.pm10 = resp.current.pm25.concentration; } else { this.pm10 = undefined; }
        if (aqi >= 0 && aqi <= 50) {
          this.bg = "level1";
          this.level = "Good";
          this.isFetching = false;
        } else if (aqi >= 51 && aqi <= 100) {
          this.bg = "level2";
          this.level = "Moderate";
          this.isFetching = false;
        } else if (aqi >= 101 && aqi <= 150) {
          this.bg = "level3";
          this.level = "Unhealthy for Sensitive Groups";
          this.isFetching = false;
        } else if (aqi >= 151 && aqi <= 200) {
          this.bg = "level4";
          this.level = "Unhealthy";
          this.isFetching = false;
        } else if (aqi >= 201 && aqi <= 300) {
          this.bg = "level5";
          this.level = "Very Unhealthy";
          this.isFetching = false;
        } else if (aqi >= 201 && aqi <= 300) {
          this.bg = "level6";
          this.level = "Hazardous";
          this.isFetching = false;
        }
      })
  }

}
