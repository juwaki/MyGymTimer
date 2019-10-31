import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AboutComponent } from 'src/app/tabs/about/about.component';
import { SuggestionsComponent } from 'src/app/tabs/suggestions/suggestions.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, AboutComponent, SuggestionsComponent],
  entryComponents: [AboutComponent, SuggestionsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Insomnia,
    EmailComposer,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
