import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// 
import { Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
// 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public bluetoothle: BluetoothLE, public plt: Platform,  public navCtrl: NavController) {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
   
      this.bluetoothle.initialize().then(ble => {
        console.log('ble', ble.status) // logs 'enabled'
      });
   
     });
  }

}
