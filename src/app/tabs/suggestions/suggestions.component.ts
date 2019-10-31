import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, AlertController } from '@ionic/angular';
// tslint:disable-next-line:no-unused-expression






@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {


  message: any;
  showAlert: boolean;


  constructor(private emailComposer: EmailComposer, public modalCtrl: ModalController,
              public alertController: AlertController) {
    this.message = null;
    this.showAlert = false;
  }

  ngOnInit() { }


  sendEmail() {
    if (this.message != null) {

      this.showAlert = false;
      let email = {
        to: 'juwakiledwaba@gmail.com',
        cc: 'juwaki@icloud.co.za',
        subject: 'My Gym Timer',
        body: this.message,
        isHtml: true
      };
      this.emailComposer.open(email);
    } else {

      this.showAlert = true;
    }


  }
   


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

}
