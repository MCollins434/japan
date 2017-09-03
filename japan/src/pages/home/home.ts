import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Deploy } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appversion: string;
  dbversion: string;
  driverfound: string;
  connectSubscription: any;
  disconnectSubscription: any;
  connectionstatus: string;
  plats: string[];
  msgs: string[];
  dataDir: string;
  freeSpace: string;
  appDir: string;
  o: Observable<any>;
  oSub: any;
  spaceLoop: any;
  here: boolean;
  lineone: string = "...";
  linetwo: string = "...";
  linethree: string = "...";
  linefour: string = "...";
  shoop: string = " ";
  loopcount: number;

  constructor(public navCtrl: NavController, public data: DataProvider, public storage: Storage,
    private network: Network, public platform: Platform, public deploy: Deploy) {
    this.msgs = [];
    this.plats = this.platform.platforms();
    this.driverfound = this.storage.driver;
    this.data.setFallbacks();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (navigator.onLine) {
      this._setConn("online");
    }
    else {
      this._setConn("offline");
    }
    this._updateApp();
    this._getAppVersion();
    this._getDbVersion();
  }

  ionViewDidEnter() {
    console.log('entered home view');
    this.here = true;
    this.loopcount = 0;
    // this._cycleJam();
    this.connectSubscription = this.network.onConnect().subscribe(data => {
      console.log(data);
      this._setConn(data.type);
      setTimeout(() => {
        this._setConn(data.type);
      }, 3000);
    }, error => console.error(error));

    this.disconnectSubscription = this.network.onDisconnect().subscribe(data => {
      console.log(data);
      this._setConn(data.type);
    }, error => console.error(error));

    let num = 0;
    let o = Observable.interval(1000).map(() => {
      this.loopSpace(num);
      num++;
    });
    this.oSub = o.subscribe();
  }

  ionViewDidLeave() {
    this.here = false;
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
    this.oSub.unsubscribe();
  }

  _setConn(type: string) {
    let nt = this.network.type || "stupid browser";
    this.connectionstatus = "You are: " + type + " via " + nt;
  }

  _tryRefresh() {
    this.msgs.push("Trying refresh...");
    this.msgs.push("Checking network connection...");
    if (navigator.onLine) {
      this.data.setLatest();
      this.msgs.push("Updated!");
      this._getDbVersion();
    }
    else {
      this.msgs.push("Connect to the interweb and try again");
    }
  }

  private _getDbVersion() {
    this.data.getDbVersion().then((resp) => {
      this.dbversion = resp;
    });
  }

  private _getAppVersion() {
    this.data.getAppVersion().then((resp) => {
      let resps = resp;
      let v = resps[0].version;
      this.appversion = v;
    });
  }

  private _updateApp() {
    if (this.platform.is('cordova')) {
      this.deploy.check().then((snapshotAvailable: boolean) => {
        if (snapshotAvailable) {

          this.deploy.getMetadata().then((metadata) => {
            console.log(JSON.stringify(metadata));
          });

          this.deploy.download().then(() => {
            this.deploy.extract().then(() => {
              this.deploy.load();
            });
          });
        }
      });
    }
    else {
      console.log("Not on real device, no deploy allowed");
    }
  }
  loopSpace(num: number) {
    let i = num % 5;
    let f = "Come on and";
    let s = "SLAM";
    let t = "and welcome to";
    let fr = "JAPAN";
    let b = "...";


    if(i == 0) {
      this.shoop = "";
      this.lineone = b;
      this.linetwo = b;
      this.linethree = b;
      this.linefour = b;
    }
    if(i == 1) {
      this.lineone = f;
    }
    if(i == 2) {
      this.linetwo = s;
    }
    if(i == 3) {
      this.linethree = t;
    }
    if( i == 4) {
      this.linefour = fr;
    }

    if(num != 0 && num % 15 == 0) {
      this.lineone = "";
      this.linetwo = "";
      this.linethree = "";
      this.linefour = "";
      this.shoop = "SHOOT BABY SHOOT";
    }
    if(num % 15 != 0) {
      this.shoop = "";
    }
  }
}
