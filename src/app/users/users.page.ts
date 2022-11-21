import {Component, OnInit} from '@angular/core';
import {collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  fuelStations: any[];
  private newQueue=['0'];

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
    const getColRef = collection(this.firestore, `fuel_stations`);
    collectionData(getColRef).subscribe(fuelStations => {
      this.fuelStations = fuelStations;
    });
  }
  async addToQueue(id,vehicleNumber,orderAmount){
    const getDocRef = doc(this.firestore, `fuel_stations/${id}`);
    const data = await getDoc(getDocRef);
    this.newQueue = data.get('queue');
    this.newQueue.push(this.auth.currentUser.uid);
    await updateDoc(getDocRef,{
      queue:this.newQueue,
      fuelStock:(data.get('fuelStock')-orderAmount)
    });
    const orderDocRef = doc(this.firestore, `orders/${this.auth.currentUser.uid}`);
    await setDoc(orderDocRef, {
      station: id,
      vNumber: vehicleNumber,
      amount: orderAmount
    });
    this.router.navigateByUrl('/user-in-queue', { replaceUrl: true });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async presentAlert(id) {
    const getDocRef = doc(this.firestore, `fuel_stations/${id}`);
    const docData = await getDoc(getDocRef);
    if(docData.get('fuelStock')===0){
      this.showAlert('Error','No fuel available in this station. Try a different fuel station');
    }else {
      const alert = await this.alertController.create({
        header: 'Please enter your order details',
        inputs: [
          {
            name: 'vehicleNumber',
            placeholder: 'Vehicle Number',
            attributes: {
              maxlength: 8,
            },
          },
          {
            name: 'orderAmount',
            type: 'number',
            placeholder: 'Amount of Fuel',
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
              if (data.vehicleNumber === '' || data.vehicleNumber === null || data.vehicleNumber.length < 7) {
                this.showAlert('Error', 'Invalid Vehicle Number. Vehicle number should be at least 7 characters long (Eg: KW-9456)');
                // eslint-disable-next-line max-len
              } else if (data.orderAmount < 0 || data.orderAmount > docData.get('fuelStock') || data.orderAmount === '' || data.orderAmount === null) {
                this.showAlert('Error', 'Invalid Order amount. The order amount must be less than the available fuel stock');
              }else{
                this.addToQueue(id,data.vehicleNumber,data.orderAmount);
              }
            }
          }
        ]
      });

      await alert.present();
    }
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
