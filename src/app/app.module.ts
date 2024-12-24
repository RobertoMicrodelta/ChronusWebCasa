import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, tuiFormatNumber, TuiFormatNumberPipeModule, TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TuiTableModule} from '@taiga-ui/addon-table';
import { ComponentsModule } from "./components/components.module";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
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
    CommonModule
],
  providers: [ 
    provideClientHydration(),
      {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
