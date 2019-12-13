import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isSending: boolean;

  ngOnInit() {
    this.isSending = false;
  }

  return: Observable<any>;

  constructor(public httpClient: HttpClient, public navCtrl: NavController, public toast: ToastController) {
  }

  register(usr: string, pwd: string) {
    if (usr.length >= 3 && pwd.length >= 3) {
      this.isSending = true;
      this.return = this.httpClient.get("http://airqualityapi.herokuapp.com/register?username=" + usr + "&password=" + pwd);
      this.return.subscribe(
        resp => {
          if (resp.message == "Success") {
            this.navCtrl.navigateBack('/tabs/user');
            this.showMessage("Success, Please log in", "top");
            this.isSending = false;
          } else if (resp.message == "Already registered") {
            this.showMessage("This username is already registered", "bottom");
            this.isSending = false;
          } else {
            this.showMessage("Something went wrong! Please try again", "bottom");
            this.isSending = false;
          }
        }
      )
    } else {
      this.showMessage("Please put at least 3 characters", "bottom");
    }
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
