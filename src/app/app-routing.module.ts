import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionalidadesComponent } from './pages/funcionalidades/funcionalidades.component';
import { HomeComponent } from './pages/home/home.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { PoliticaDePrivacitatComponent } from './pages/politica-de-privacitat/politica-de-privacitat.component';
import { PoliticaDeCookiesComponent } from './pages/politica-de-cookies/politica-de-cookies.component';
import { AvisLegalComponent } from './pages/avis-legal/avis-legal.component';
import { PedirUnaDemoComponent } from './pages/pedir-una-demo/pedir-una-demo.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Pàgina principal
  { path: 'funcionalidades', component: FuncionalidadesComponent }, // Funcionalidades
  { path: 'precios', component: PreciosComponent }, // Preus
  { path: 'contact', component: ContactComponent }, // Contacta con nosotros
  { path: 'crear_cuenta', component: CrearCuentaComponent }, // Crear una cuenta
  { path: 'politica_de_privacitat', component: PoliticaDePrivacitatComponent }, // Politica de privacitat
  { path: 'politica_de_cookies', component: PoliticaDeCookiesComponent }, // Politica de COOKIES
  { path: 'avis_legal', component: AvisLegalComponent }, // Avis Legal
  { path: 'pedir_una_demo', component: PedirUnaDemoComponent }, // Pedir una demo
  { path: '**', redirectTo: '/' } // Si no es una ruta vàlida, redirigim a la pàgina principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
