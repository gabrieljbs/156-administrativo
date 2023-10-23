import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { FirestoreService } from './../../services/firestore.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent  implements OnInit {
  @Input() data: any;

  public user=''
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private firestore: FirestoreService
    ) { }

  ngOnInit() {}

  async confirm(){
    await this.presentAlert()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '5', '5', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

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
