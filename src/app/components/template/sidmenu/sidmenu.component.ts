import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-sidmenu',
  templateUrl: './sidmenu.component.html',
  styleUrls: ['./sidmenu.component.scss'],
})
export class SidmenuComponent  implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {}
  openMenu() {
    this.menuController.open();
  }
}
