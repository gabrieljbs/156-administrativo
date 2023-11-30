import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsComponent } from './requests/requests.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { UserComponent } from './user/user.component';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  declarations: [RequestsComponent, UserComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    MaskitoModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalsModule { }
