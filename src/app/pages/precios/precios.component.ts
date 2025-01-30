import { Component } from '@angular/core';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
  openGooglePlay() {
    window.open('https://play.google.com/store/apps/details?id=microdelta.chronustime&hl=es&gl=US', '_blank');
  }

  openAppleStore() {
    window.open('https://apps.apple.com/es/app/chronus-time/id1570611343', '_blank');
  }


}
