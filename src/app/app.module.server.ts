import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TuiPaymentSystem } from '@taiga-ui/addon-commerce';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
    readonly paymentSystem: TuiPaymentSystem = 'mir';
    readonly brandLogo = 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg';
}
