import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, tuiFormatNumber, TuiFormatNumberPipeModule, TuiButtonModule, TuiSvgModule, TuiAppearance } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TuiTableModule} from '@taiga-ui/addon-table';
import { ComponentsModule } from "./components/components.module";
import { CommonModule } from "@angular/common";
import { FuncionalidadesComponent } from './pages/funcionalidades/funcionalidades.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { TuiCarouselModule, TuiIslandModule } from "@taiga-ui/kit";
import { PoliticaDePrivacitatComponent } from './pages/politica-de-privacitat/politica-de-privacitat.component';
import { HttpClientModule } from "@angular/common/http";
import { PoliticaDeCookiesComponent } from './pages/politica-de-cookies/politica-de-cookies.component';
import { AvisLegalComponent } from './pages/avis-legal/avis-legal.component';
import { PedirUnaDemoComponent } from './pages/pedir-una-demo/pedir-una-demo.component';
import { FormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';






@NgModule({
  declarations: [
    AppComponent,
    FuncionalidadesComponent,
    PreciosComponent,
    HomeComponent,
    ContactComponent,
    CrearCuentaComponent,
    PoliticaDePrivacitatComponent,
    PoliticaDeCookiesComponent,
    AvisLegalComponent,
    PedirUnaDemoComponent,
    SobreNosotrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiTableModule,
    TuiFormatNumberPipeModule,
    ComponentsModule,
    CommonModule,
    TuiSvgModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiButtonModule,
    HttpClientModule,
    FormsModule

],
  providers: [
    CookieService,
    provideClientHydration(),
      {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
