import { Component } from '@angular/core';
import {TuiPaymentSystem} from '@taiga-ui/addon-commerce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prova';
  

  readonly paymentSystem: TuiPaymentSystem = 'mir';
  readonly brandLogo = 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg';
}
