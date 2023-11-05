import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.page.html',
  styleUrls: ['./tourism.page.scss'],
})
export class TourismPage implements OnInit {
  public tourism: FormGroup;
  public imageSrc: any = null;
  public url: any;
  public loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private storageService: StorageService,
    private firestore: FirestoreService,
    private formBuilde: FormBuilder
  ) {

    this.tourism = this.formBuilde.group({
      info:'',
      titulo:'',
    })

  }

  ngOnInit() {}
  handleFile(event: any) {
    console.log(event);
    const files = event.target.files?.[0];
    this.imageSrc = files;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url = e.target.result;
      console.log(this.url);
    };
    reader.readAsDataURL(this.imageSrc);
  }

  async addTourism(input:any) {
    this.showLoading()
  try {
    const imageRef = await this.storageService.setFiles(input);
    Object.assign(this.tourism.value,{url: imageRef})
    await this.firestore.createTourism(this.tourism.value)
    this.loading.dismiss()
    this.presentToast('Sucesso ao salvar novo ponto turistico ')
  } catch (error) {
    this.loading.dismiss()
    this.presentToast(error)
  }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      position: 'middle',
      color: 'danger',
    });
    await toast.present();
  }
}
