import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './popup/popup.component';
import { CookiesBannerComponent } from './cookies-banner/cookies-banner.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PopupComponent,
    CookiesBannerComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    RouterModule,
    FormsModule
    
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PopupComponent,
    CookiesBannerComponent
  ],
})
export class ComponentsModule { }
