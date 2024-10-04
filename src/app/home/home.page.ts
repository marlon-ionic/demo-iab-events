import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { addIcons } from 'ionicons';
import { open } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
  providers: [InAppBrowser]
})
export class HomePage {
  private data = inject(DataService);
  private readonly iab = inject(InAppBrowser);
  constructor() {
    addIcons({ open});
  }

  async openIAB() {
    const ref = await this.iab.create('https://ionicframework.com/');
    if(Capacitor.isNativePlatform()) {
    console.log('openIAB', ref.on, ref);
    ref.on('loadstart').subscribe(event => {
      console.log('loadstart', event);
    });
    ref.on('loadstop').subscribe(event => {
      console.log('loadstop', event);
    });
  }
}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
