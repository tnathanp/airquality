import { Component } from '@angular/core';
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
  account: string = '';
  level: string = 'default';
  aqi: number = 0;

  constructor(public httpClient: HttpClient) { }

  return: Observable<any>;
  fetch: Observable<any>;

  ionViewWillEnter() {
    this.isLoading = true;
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    this.account = localStorage.getItem("isLoginAs");
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
    var id = param.split(',')[0];
    var types = param.split(',')[1];
    this.fetch = this.httpClient.get("http://airqualityapi.herokuapp.com/fetch?q=" + id + "&t=" + types);
    this.fetch.subscribe(
      resp => {
        console.log(resp);
        var aqi = resp.current.aqi;
        this.aqi = aqi;
        if (aqi >= 0 && aqi <= 50) {
          this.level = "level1";
        } else if (aqi >= 51 && aqi <= 100) {
          this.level = "level2";
        } else if (aqi >= 101 && aqi <= 150) {
          this.level = "level3";
        } else if (aqi >= 151 && aqi <= 200) {
          this.level = "level4";
        } else if (aqi >= 201 && aqi <= 300) {
          this.level = "level5";
        }
      })
  }

}
