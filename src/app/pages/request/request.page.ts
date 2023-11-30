import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { RequestsComponent } from 'src/app/modals/requests/requests.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  public interfaceRequests: any[] = [];
  public isModalOpen = false;
  public results: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private firestore: FirestoreService) {}

  ngOnInit() {
    this.date();

    console.log(this.interfaceRequests)
  }

  async date() {
    const data = await this.firestore.readRequests();
    data.forEach((doc) => {
        const data = doc.data()
        Object.assign(data,{id:doc.id})
      this.interfaceRequests.push(data);
      this.results = [...this.interfaceRequests];
    });
  }

  async modalOpen(data: any) {
    const modal = await this.modalCtrl.create({
      component: RequestsComponent,
      cssClass: 'my-modal-class',
      componentProps: {
        data: { ...data }
      },
    });
    modal.present();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.interfaceRequests.filter(
      (d) => d?.nome?.toLowerCase().indexOf(query) > -1
    );
  }
}
