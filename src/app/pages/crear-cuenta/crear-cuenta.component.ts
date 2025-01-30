import { Component } from '@angular/core';
import { CountryService } from '../../country.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss'
})
export class CrearCuentaComponent {
  countries: any[] = [];
  errorMessage: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        this.errorMessage = 'No s’han pogut carregar els països. Torna-ho a intentar més tard.';
        console.error('Error carregant països:', error);
      },
    });
  }
}
