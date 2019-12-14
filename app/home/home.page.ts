import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  ngOnInit(){
    this.Fetch("WJv6Pqdvj8ph9xkuZ","cities");
  }

  constructor(public httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  data: Observable<any>;
  aqii: number;
  Info=null;
  readyInfo: Array<string>;

  Search(ev){
    this.data=this.httpClient.get("https://website-api.airvisual.com/v1/search?q="+ev.target.value+"&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en");
    this.data.subscribe(
        resp=>{ console.log(resp);
      
    }
    )
  }

  Fetch(query: string, type: string){
    this.data=this.httpClient.get("http://airqualityapi.herokuapp.com/fetch?q="+query+"&t="+type);
    this.data.subscribe(
        resp=>{ console.log(resp);
    }
    )
  } 

  whatClassIsIt(aqi: string){
    this.aqii=parseInt(aqi);
    if (this.aqii<=50){
      return "bg-class1";
    } else if(this.aqii>50 && this.aqii<=100){
      return "bg-class2";
    } else if (this.aqii>100 && this.aqii<=150){
      return "bg-class3";
    } else if (this.aqii>150 && this.aqii<=200){
      return "bg-class4";
    } else if (this.aqii>200 && this.aqii<=300){
      return "bg-class5";
    } else if (this.aqii>300){
      return "bg-class6";
    } 
  }
  
  whatLevelIsIt(aqi: string){
    this.aqii=parseInt(aqi);
    if (this.aqii<=50){
      return "Good";
    } else if(this.aqii>50 && this.aqii<=100){
      return "Moderate";
    } else if (this.aqii>100 && this.aqii<=150){
      return "Unhealthy for Sensitive Groups";
    } else if (this.aqii>150 && this.aqii<=200){
      return "Unhealthy";
    } else if (this.aqii>200 && this.aqii<=300){
      return "Very Unhealthy";
    } else if (this.aqii>300){
      return "Hazardous";
    } 
  }

  /*ionViewWillEnter() {
    this.Info=this.activatedRoute.snapshot.paramMap.get('info');
    this.readyInfo=this.Info.split(",");
    this.data=this.httpClient.get("http://airqualityapi.herokuapp.com/fetch?q="+this.readyInfo[0]+"&t="+this.readyInfo[1]);
    this.data.subscribe(
        resp=>{ console.log(resp);
    }
    )
  }*/

}
