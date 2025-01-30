import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  openLink() {
    window.open('https://www.gestionvacaciones.com/dashboard/', '_blank');
  }

}
