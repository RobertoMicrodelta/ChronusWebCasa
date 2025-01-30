import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {
  @Input() title: string = 'Mensaje predeterminado';
  @Input() message: string = 'Éste es un popup predeterminado.';
  @Input() link: string = '/demo';
  @Input() linkText: string = 'Pruébalo ahora';

  showPopup: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    // Comprovar si les cookies han estat acceptades abans de mostrar el popup
    if (isPlatformBrowser(this.platformId)) {
      const cookiesAccepted = this.getFromLocalStorage('cookiesAccepted');  // Canviat de cookies a localStorage

      if (cookiesAccepted === 'true' || cookiesAccepted === 'false') { 
        // Espera 10 segons abans de mostrar el popup després d'acceptar les cookies
        setTimeout(() => {
          const popupShown = this.getFromLocalStorage('popupShown');
          if (!popupShown) {
            this.showPopup = true;
          }
        }, 10000); // 10 segons
      }
    }
  }

  // Funció per tancar el popup
  closePopup() {
    this.showPopup = false;
  }

  // Funció per evitar que el popup es mostri de nou
  dontShowAgain(): void {
    this.setToLocalStorage('popupShown', 'true');
    this.showPopup = false;
  }

  // Funció per obtenir un valor de localStorage
  getFromLocalStorage(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(name);
    }
    return null;
  }

  // Funció per establir un valor a localStorage
  setToLocalStorage(name: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(name, value);
    }
  }
}