import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourismPageRoutingModule } from './tourism-routing.module';

import { TourismPage } from './tourism.page';
import { PagesPageModule } from '../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourismPageRoutingModule,
    PagesPageModule,
    ReactiveFormsModule
  ],
  declarations: [TourismPage]
})
export class TourismPageModule {}
