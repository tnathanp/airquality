import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss']
})
export class UserPage {

  isSending: boolean = false;
  isLogin: boolean = false;
  account: string = '';
  usr: string;
  pwd: string;

  constructor(public httpClient: HttpClient, public toast: ToastController) { }

  ngOnInit() {
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    this.account = localStorage.getItem("isLoginAs");
  }

  return: Observable<any>;

  login(usr: string, pwd: string) {
    if (usr.length >= 3 && pwd.length >= 3) {
      this.isSending = true;
      this.return = this.httpClient.get("http://airqualityapi.herokuapp.com/login?username=" + usr + "&password=" + pwd);
      this.return.subscribe(
        resp => {
          if (resp.message == "Okay") {

            localStorage.setItem("isLoginAs", usr);
            this.account = localStorage.getItem("isLoginAs");

            localStorage.setItem("isLogin", "true");
            this.isLogin = JSON.parse(localStorage.getItem("isLogin"));

            this.isSending = false;
          } else if (resp.message == "Username not found") {

            this.showMessage("This username is not found", "top");
            this.isSending = false;

          } else if (resp.message == "Wrong password") {

            this.showMessage("Wrong password", "top");
            this.isSending = false;

          } else {

            this.showMessage("Something went wrong! Please try again", "top");
            this.isSending = false;

          }
        }
      )
    } else {
      this.showMessage("Please put at least 3 characters", "top");
    }
  }

  logout(){
    localStorage.setItem("isLoginAs",'');
    localStorage.setItem("isLogin","false");
    localStorage.setItem("selected","");
    this.account = '';
    this.isLogin = false;
  }

  async showMessage(text: string, pos: any) {
    const t = await this.toast.create({
      message: text,
      duration: 3000,
      position: pos
    });
    await t.present();
  }

}
