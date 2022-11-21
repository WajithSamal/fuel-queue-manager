import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {collection, deleteDoc, doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import {AlertController, LoadingController} from '@ionic/angular';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-service-queue',
  templateUrl: './service-queue.page.html',
  styleUrls: ['./service-queue.page.scss'],
})
export class ServiceQueuePage implements OnInit {
  scanActive = false;
  private order: any;
  private newQueue = ['0'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: Firestore,
    private auth: Auth
  ) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        await this.scanDone(result.content);
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async scanDone(id) {
    const getDocRef = doc(this.firestore, `fuel_stations/${this.auth.currentUser.uid}`);
    const data = await getDoc(getDocRef);
    this.newQueue = data.get('queue');
    this.newQueue.forEach((element, index) => {
      if (element === id) {
        this.newQueue.splice(index, 1);
      }
    });
    ;
    await updateDoc(getDocRef, {
      queue: this.newQueue,
    });
    const orderColRef = collection(this.firestore, `orders`);
    await deleteDoc(doc(orderColRef, id));
    this.router.navigateByUrl('/owners', {replaceUrl: true});
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}


