import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userForm: FormGroup;
  private loading: any;
  public error: string = '';
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {}
  async login() {
    try {
      this.showLoading();
      await this.authService.login(this.userForm.value);
      this.loading.dismiss();
      this.redirect('/home');
    } catch (error: any) {
      this.loading.dismiss();
      return await this.presentToast(error.message);
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create();
    this.loading.present();
  }
  redirect(path: string) {
    this.router.navigate([path]);
  }

  async presentToast(e: string) {
    if (e === 'Firebase: Error (auth/invalid-email).') {
      this.error = 'Email é inválido';
    } else if (e === 'Firebase: Error (auth/wrong-password).') {
      this.error = 'Senha incorreta';
    } else {
      this.error = e;
    }
    const toast = await this.toastController.create({
      message: this.error,
      duration: 7000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }


}
