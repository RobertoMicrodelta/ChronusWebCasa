import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.scss'
})
export class SobreNosotrosComponent {

  openEquipMicrodelta() {
    window.open('https://microdelta.net/new/equip.php', '_blank');
  }

  openServeisMicrodelta() {
    window.open('https://microdelta.net/index.php', '_blank');
  }

}
