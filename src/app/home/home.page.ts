import { Component } from '@angular/core';

import VConsole from 'vconsole';
new VConsole();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  vid = 'fb3aa3b1d204200362e919cfd461f799_f';
  vodPlayerJs = 'https://player.polyv.net/script/player.js';
  player;
  constructor() { }

  ngAfterViewInit() {
    this.loadPlayerScript(this.loadPlayer.bind(this));
  }

  private loadPlayer() {
    setTimeout(() => {
      this.player = (window as any).polyvPlayer({
        // forceH5: true,
        wrap: '#player',
        height: 250,
        vid: this.vid,
      });
    }, 100);

    (window as any).s2j_onFullScreen = () => {
      console.log('进入全屏');
    };

    // 这个不工作
    (window as any).s2j_onNormalScreen = () => {
      console.log('退出全屏');
    };

  }

  private loadPlayerScript(callback) {
    if (!(window as any).polyvPlayer) {
      const myScript = document.createElement('script');
      myScript.onload = callback;
      myScript.setAttribute('src', this.vodPlayerJs);
      document.body.appendChild(myScript);
    } else {
      callback();
    }
  }

}
