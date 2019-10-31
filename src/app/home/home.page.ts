import { Component } from '@angular/core';
import { ParseSourceFile } from '@angular/compiler';
import { Math } from 'core-js';
import { setInterval } from 'core-js/library/web/timers';
import { parseInt } from 'core-js/library/es6/number';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { ModalController } from '@ionic/angular';
import { AboutComponent } from 'src/app/tabs/about/about.component';
import { SuggestionsComponent } from 'src/app/tabs/suggestions/suggestions.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  percent = 0;
  radius = 100;
  fullTime: any = '00:01:30';
  timer: any = false;
  progress: any = 0;
  minutes = 1;
  seconds: any = 30;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  };

  overallTimer: any = false;


  constructor(private insomnia: Insomnia, public modalController: ModalController) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AboutComponent
    });
    return await modal.present();
  }

  async suggestModal() {
    const modal = await this.modalController.create({
      component: SuggestionsComponent
    });
    return await modal.present();
  }

startTimer() {

  if (this.timer) {
    clearInterval(this.timer);
  }

  if (!this.overallTimer) {
    this.progressTimer();
    this.insomnia.keepAwake();

  }

  this.timer = false;
  this.percent = 0;
  this.progress = 0;

  const timeSplit = this.fullTime.split(':');
  this.minutes = timeSplit[1];
  this.seconds = timeSplit[2];


  // tslint:disable-next-line:radix
  const totalSeconds = this.RoundNum(this.minutes * 60) + parseInt(this.seconds);

  if (this.percent === this.radius) {
    clearInterval(this.timer);
  }

  this.timer = setInterval(() => {
    this.percent = this.RoundNum((this.progress / totalSeconds) * 100);
    this.progress++;
  }, 1000);
}

RoundNum(value) {
  let c = value % 1;
  // tslint:disable-next-line:no-bitwise
  return value - c + (c / 1 + 1.5 >> 1) * 1;
}


progressTimer() {
  let countDownDate = new Date();

  this.overallTimer = setInterval(() => {
    let now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = now - countDownDate.getTime();

    // Time calculations for hours, minutes and seconds

    this.elapsed.h = this.RoundNum((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.elapsed.m = this.RoundNum((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.elapsed.s = this.RoundNum((distance % (1000 * 60)) / 1000);

    this.elapsed.h = this.pad(this.elapsed.h, 2);
    this.elapsed.m = this.pad(this.elapsed.m, 2);
    this.elapsed.s = this.pad(this.elapsed.s, 2);



  }, 1000);
}

pad(num, size) {
  let s = num + "";
  while (s.length < size) { s = "0" + s; }
  return s;
}

stopTimer() {
  clearInterval(this.timer);
  clearInterval(this.overallTimer);
  // this.countDownTimer = false;
  this.overallTimer = false;
  this.timer = false;
  this.percent = 0;
  this.progress = 0;
  this.elapsed = {
    h: '00',
    m: '00',
    s: '00'
  };

  this.insomnia.allowSleepAgain();

}

}
