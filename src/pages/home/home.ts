import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

// 
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BLE } from '@ionic-native/ble';
// 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: any[] = [];
  statusMessage: string;
  peripheral: any = {};

  constructor(private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    public bluetoothle: BluetoothLE,
    public platform: Platform,
    public navCtrl: NavController) {
  } // constructor

  ionViewDidEnter() {
    if (this.ble.isEnabled) {
      this.setStatus('Bluetooth desativado');
    }
    else
    {
      console.log('ionViewDidEnter');
      this.scan();
    }
    
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  // deviceSelected(device) {
  //   console.log(JSON.stringify(device) + ' selected');
  //   this.setStatus('Connecting to ' + device.name || device.id);

  //   this.ble.connect(device.id).subscribe(
  //    // peripheral => this.onConnected(peripheral),
  //     peripheral => this.onDeviceDisconnected(peripheral)
  //   );
  // }

  // onConnected(peripheral) {
  //   this.ngZone.run(() => {
  //     this.setStatus('');
  //     this.peripheral = peripheral;
  //   });
  // }

  // onDeviceDisconnected(peripheral) {
  //   let toast = this.toastCtrl.create({
  //     message: 'The peripheral unexpectedly disconnected',
  //     duration: 3000,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave disconnecting Bluetooth');
  //   this.ble.disconnect(this.peripheral.id).then(
  //     () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
  //     () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
  //   )
  // }

} // fim HomePage
