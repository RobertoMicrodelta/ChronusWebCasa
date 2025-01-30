import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data.map((country: any) => ({
        name: country.country,
        code: country.iso2 || country.country.slice(0, 2).toUpperCase(),
      })))
    );
  }
}
