import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.page.html',
  styleUrls: ['./tourism.page.scss'],
})
export class TourismPage implements OnInit {
  public imageSrc:any =null
  public url:any
  public loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
  }
  handleFile(event: any) {
    this.imageSrc = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };
    console.log(this.url);
    reader.readAsDataURL(this.imageSrc);

    console.log(this.imageSrc)
  }


  async addTourism(){
    try {

      await this.storageService.setFiles(this.imageSrc)

      this.presentToast('Ponto turistico salvo com sucesso ')
    } catch (error) {

      return await this.presentToast(`Ponto turistico não foi salvo, Error:${error}`)
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      position: 'middle',
      color: 'danger',
    });
    await toast.present();
  }

}
