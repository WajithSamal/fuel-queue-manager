import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {
  collection,
  collectionData, deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  onSnapshot,
  updateDoc
} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';


@Component({
  selector: 'app-user-in-queue',
  templateUrl: './user-in-queue.page.html',
  styleUrls: ['./user-in-queue.page.scss'],
})
export class UserInQueuePage implements OnInit {

  userId=null;
  location=null;
  private order: any;
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
    this.userId=this.auth.currentUser.uid;
    const getColRef = collection(this.firestore, `orders`);
    const unsub = onSnapshot(doc(getColRef, this.userId ), (orderDetail) => {
      this.order=orderDetail.data();
      if(this.order===undefined){
        this.router.navigateByUrl('/users', {replaceUrl: true});
      }else{
        this.loc();
      }
    });
  }

  async loc(){
    const getDocRef = doc(this.firestore, `fuel_stations/${this.order.station}`);
    const data = await getDoc(getDocRef);
    this.location = data.get('location');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: data=> {
            this.exitFromQueue();
          }
        }
      ]
    });
    await alert.present();
  }

  async exitFromQueue(){
    const getDocRef = doc(this.firestore, `fuel_stations/${this.order.station}`);
    const data = await getDoc(getDocRef);
    this.newQueue = data.get('queue');
    this.newQueue.forEach((element,index)=>{
      if(element===this.auth.currentUser.uid) {this.newQueue.splice(index,1);}
    });;
    const val: number= +this.order.amount;
    await updateDoc(getDocRef,{
      queue:this.newQueue,
      fuelStock:(data.get('fuelStock')+val)
    });
    const orderColRef = collection(this.firestore, `orders`);
    await deleteDoc(doc(orderColRef, this.userId));
  }
}
