import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent  implements OnInit {
  @Input() data: any;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      subHeader: 'Edição dos dados',
      message: 'Click Sim se vocè quer alterar os dados',
      buttons: [
        {
          text: 'Concelar',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss
          },
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            await this.firestore.updateUser(this.data)
            this.alertController.dismiss
            ;
          },
        },
      ],

    });

    await alert.present();
  }
}
