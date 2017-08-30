import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Deploy } from '@ionic/cloud-angular';
//import { File } from '@ionic-native/file';

import { DataProvider } from '../../providers/data';

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
  dataDir: string;
  freeSpace: string;
  appDir: string;

  constructor(public navCtrl: NavController, public data: DataProvider,
    private network: Network, public platform: Platform, public deploy: Deploy) {
    this.msgs = [];
    this.plats = this.platform.platforms();
    this._getDbVersion();
    /*if(!this.platform.is('cordova')){
      this.dataDir = this.file.dataDirectory;
      this.appDir = this.file.applicationDirectory;
      this.file.getFreeDiskSpace().then((value) => {
        this.freeSpace = ''+value;
      });*/
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
    if(navigator.onLine){
      this.data.setLatest().then(() => this.msgs.push("Updated!"));
    }
    else {
      this.msgs.push("Connect to the interweb and try again");
    }
  }

  private _getDbVersion() {
    this.data.getDbVersion().then((resp) => {
      this.dbversion = resp[0].version;
    });
  }

  private _getAppVersion() {
    this.data.getAppVersion().then((resp) => {
      this.appversion = resp[0].version;
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
