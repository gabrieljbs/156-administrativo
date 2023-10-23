import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PagesPageRoutingModule } from './pages-routing.module';
import { PagesPage } from './pages.page';
import { HeaderComponent } from '../components/template/header/header.component';
import { SidmenuComponent } from '../components/template/sidmenu/sidmenu.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule
  ],
  declarations: [PagesPage, HeaderComponent,SidmenuComponent],
  exports:[PagesPage,HeaderComponent,SidmenuComponent]
})
export class PagesPageModule {}
