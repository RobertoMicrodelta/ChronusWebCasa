import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  actualYear = new Date().getFullYear();

  openGooglePlay() {
    window.open('https://play.google.com/store/apps/details?id=microdelta.chronustime&hl=es&gl=US', '_blank');
  }

  openAppleStore() {
    window.open('https://apps.apple.com/es/app/chronus-time/id1570611343', '_blank');
  }

}
