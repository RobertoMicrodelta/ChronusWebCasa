import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CookiesService } from '../../cookies.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookies-banner',
  templateUrl: './cookies-banner.component.html',
  styleUrls: ['./cookies-banner.component.scss']
})
export class CookiesBannerComponent implements OnInit {
  preferences = {
    necessary: true,
    statistics: false,
    marketing: false
  };
  showBanner = false;
  showPreferences = false;
  routerSubscription!: Subscription;

  constructor(
    private cookiesService: CookiesService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any // Per comprovar si estem al navegador
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Subscriure'ns als canvis de navegació
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.urlAfterRedirects;
          console.log('Current URL:', currentUrl);

          if (currentUrl.includes('politica_de_cookies')) {
            console.log('Estem a la pàgina de política de cookies. No mostrem el banner.');
            this.showBanner = false;
          } else {
            this.checkCookies();
          }
        }
      });

      // Comprovar l'estat de les cookies inicialment
      this.checkCookies();
    }
  }

  // Funció per comprovar si les cookies han estat acceptades
  checkCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cookiesAccepted = this.getFromLocalStorage('cookiesAccepted');
      if (!cookiesAccepted) {
        console.log('Cookies no acceptades. Mostrem el banner.');
        this.showBanner = true;
      } else {
        const preferences = this.cookiesService.getPreferences();
        if (preferences) {
          console.log('Carreguem preferències:', preferences);
          this.preferences = preferences;
        }
      }
    }
  }

  // Funció per acceptar totes les cookies
  acceptAllCookies(): void {
    this.cookiesService.acceptCookies(this.preferences);
    this.showBanner = false;

    // Guardar el valor de cookies acceptades a localStorage
    this.setToLocalStorage('cookiesAccepted', 'true');  // Guardem a localStorage

    // Refrescar la pàgina per iniciar el temporitzador del popup
    window.location.reload();
  }

  // Funció per mostrar el popup
  showPopup(): void {
    if (this.getFromLocalStorage('popupShown') !== 'true') {
      setTimeout(() => {
        console.log('Mostrant popup després d\'acceptar les cookies');
      }, 10000); // 10 segons després de la confirmació de les cookies
    }
  }

  // Funció per denegar totes les cookies
  declineAllCookies(): void {
    this.preferences = { necessary: true, statistics: false, marketing: false };
    this.cookiesService.acceptCookies(this.preferences);
    this.showBanner = false;
    if (isPlatformBrowser(this.platformId)) {
      this.setToLocalStorage('cookiesAccepted', 'false');  // Guardem a localStorage que no s'han acceptat
    }

    // Refrescar la pàgina per iniciar el temporitzador del popup
    window.location.reload();
  }

  // Funció per obrir les preferències de cookies
  openPreferences(): void {
    this.showPreferences = true;
  }

  // Funció per desar les preferències
  savePreferences(): void {
    // Guardem les preferències a través del servei de cookies
    this.cookiesService.acceptCookies(this.preferences);

    // Guardem les preferències de cookies a localStorage
    this.setToLocalStorage('cookiesPreferences', JSON.stringify(this.preferences));  // Guardem preferències a localStorage
    
    // Guardar cookiesAccepted com a 'true' quan es guarden les preferències
    this.setToLocalStorage('cookiesAccepted', 'true');  // Guardem que les cookies han estat acceptades

    // Tanquem el panell de configuració de cookies
    this.showPreferences = false;

    // Tanquem també el banner de cookies (similar a quan s'accepten totes les cookies)
    this.showBanner = false;

    // Refrescar la pàgina per iniciar el temporitzador del popup
    window.location.reload();
  }

  // Funció per tancar les preferències
  closePreferences(): void {
    this.showPreferences = false;
  }

  // Funció per obtenir una entrada de localStorage
  getFromLocalStorage(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(name);
    }
    return null;
  }

  // Funció per establir una entrada a localStorage
  setToLocalStorage(name: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(name, value);
    }
  }
}