import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}
  // Comprovar si les cookies han estat acceptades
  areCookiesAccepted(): boolean {
    return this.cookieService.get('cookiesAccepted') === 'true';
  }

  // Guardar l'acceptació de cookies
  acceptCookies(preferences: any): void {
    this.cookieService.set('cookiesAccepted', 'true');
    this.cookieService.set('preferences', JSON.stringify(preferences));
  }

  // Obtenir preferències de cookies
  getPreferences(): any {
    const preferences = this.cookieService.get('preferences');
    return preferences ? JSON.parse(preferences) : null;
  }
}
