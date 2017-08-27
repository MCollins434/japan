import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Deploy } from '@ionic/cloud-angular';

import { LocalsProvider } from '../../providers/locals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appversion: string;
  dbversion: string;
  connectSubscription: any;
  disconnectSubscription: any;
  connectionstatus: string;
  plats: string[];
  msgs: string[];

  constructor(public navCtrl: NavController, public locals: LocalsProvider,
    private network: Network, public platform: Platform, public deploy: Deploy) {
    this.msgs = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.plats = this.platform.platforms();

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
  }

  ionViewDidLeave() {
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  _setConn(type: string) {
    let nt = this.network.type || "stupid browser";
    this.connectionstatus = "You are: " + type + " via " + nt;
  }

  _tryRefresh() {
    this.msgs.push("Trying refresh...");
    this.msgs.push("Checking network connection...");
    this.msgs.push("Updated!");
    this._getDbVersion();
  }

  private _getDbVersion() {
    this.locals.getDbVersion().subscribe(response => {
      console.log(JSON.stringify(response));
      this.dbversion = response[0].version;
    }, err => {
      console.log(err);
    });
  }

  private _getAppVersion() {
    this.locals.getAppVersion().subscribe(response => {
      console.log(JSON.stringify(response));
      this.appversion = response[0].version;
    }, err => {
      console.log(err);
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
}
