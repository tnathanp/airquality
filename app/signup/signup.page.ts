import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  ngOnInit() {
  }

  private toast: ToastController
  return: Observable<any>;

  constructor(public httpClient: HttpClient) {
  }

  register(usr: string, pwd: string){
    this.return = this.httpClient.get("http://airqualityapi.herokuapp.com/register?username="+usr+"&password="+pwd);
    this.return.subscribe(
      resp => {
        console.log(resp.message);
      }
    )
  }

  async showError() {
    const t = await this.toast.create({
      message: "This username is already registered",
      duration: 3000,
      position: 'bottom'
    });
    await t.present();
  }
}
