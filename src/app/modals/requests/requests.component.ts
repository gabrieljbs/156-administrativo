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
  public editDate:any = {}
  public status = ['Em analise','Em andamento','Fechado','Concluido']

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
    this.editDate = this.data

    this.editDate.abertura  = this.editDate.abertura.toDate()
  }

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

  update(){
    this.editDate.atualizacao = new Date()
    this.firestore.updateRequest(this.editDate);
  }

  handleEvent(e:any){
    this.editDate.status = e.detail.value
  }


}
