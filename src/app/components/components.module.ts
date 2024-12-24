import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    // TuiTitle
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
})
export class ComponentsModule { }
