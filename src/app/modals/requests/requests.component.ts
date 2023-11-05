import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  @Input() data: any;
  public editDate: any = {};
  public status = ['Em analise', 'Em andamento', 'Cancelado', 'Concluido'];
  private loading: any;
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private loadingCtrl: LoadingController
  ) {}

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  ngOnInit() {
    this.editDate = this.data;

    this.editDate.abertura = this.editDate.abertura.toDate();
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
            this.alertController.dismiss;
          },
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            await this.firestore.updateUser(this.data);
            this.alertController.dismiss;
          },
        },
      ],
    });

    await alert.present();
  }

  async update() {
    this.showLoading();
    this.editDate.atualizacao = new Date();
    await this.firestore.updateRequest(this.editDate);
    this.cancel();
    this.loading.dismiss();
  }

  handleEvent(e: any) {
    this.editDate.status = e.detail.value;
  }
}
