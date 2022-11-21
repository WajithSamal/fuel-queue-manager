import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.page.html',
  styleUrls: ['./owners.page.scss'],
})
export class OwnersPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
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

  async gotoService() {
    this.router.navigateByUrl('/service-queue', {replaceUrl: true});
  }

  async gotoOperations() {
    this.router.navigateByUrl('/queue-operations', {replaceUrl: true});
  }

  async presentAlert() {
    const getDocRef = doc(this.firestore, `fuel_stations/${this.auth.currentUser.uid}`);
    const docData = await getDoc(getDocRef);

    const alert = await this.alertController.create({
      header: 'Please enter Restock details',
      inputs: [
        {
          name: 'stockAmount',
          type: 'number',
          placeholder: 'Amount of Fuel Restocked',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: data => {
            if (data.stockAmount === '' || data.stockAmount === null || data.stockAmount>docData.get('capacity')-docData.get('fuelStock')) {
              this.showAlert('Error', 'Invalid stock amount. Total stock must be less than full capacity');
            } else {
              this.restock(data.stockAmount);
            }
          }
        }
      ]
    });

    await alert.present();

  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async restock(amount){
    const getDocRef = doc(this.firestore, `fuel_stations/${this.auth.currentUser.uid}`);
    const docData = await getDoc(getDocRef);
    const val: number= +docData.get('fuelStock');
    const val2: number= +amount;
    await updateDoc(getDocRef,{
      fuelStock:(val+val2)
    });
  }
}
