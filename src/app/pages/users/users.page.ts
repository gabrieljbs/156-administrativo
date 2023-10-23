import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../services/firestore.service';
import { UserComponent } from 'src/app/modals/user/user.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public interfaceUser: any[] = [];
  public isModalOpen = false;
  public results: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    this.date();
  }

  async date() {
    const date = await this.firestore.readUser();
    date.forEach((doc) => {
      this.interfaceUser.push(doc.data());
      this.results = [...this.interfaceUser];
    });
  }

  async modalOpen(data: any) {
    console.log('adsasd');
    const modal = await this.modalCtrl.create({
      component: UserComponent,
      componentProps: {
        data,
      },
    });
    modal.present();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.interfaceUser.filter(
      (d) => d?.nome?.toLowerCase().indexOf(query) > -1
    );
  }
}
