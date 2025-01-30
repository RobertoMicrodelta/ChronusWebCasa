import { Component, OnInit, ViewChild } from '@angular/core';
import { TuiCarouselComponent } from '@taiga-ui/kit';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html',
  styleUrl: './funcionalidades.component.scss'
})
export class FuncionalidadesComponent{
  @ViewChild('carousel', { static: true }) carousel!: TuiCarouselComponent;

  openDashBoard() {
    window.open('https://www.gestionvacaciones.com/dashboard/', '_blank');
  }
  
  cards = [
    {
      icon: 'bi bi-clock',
      title: 'Fichajes',
      text: 'Posibilidad de fichar desde cualquier dispositivo ya sea PC, Tablet, Móvil.',
    },
    {
      icon: 'bi bi-person',
      title: 'Horarios y Usuarios',
      text: 'Permite gestionar múltiples horarios y registrar varios empleados en el sistema.',
    },
    {
      icon: 'bi bi-building',
      title: 'Centros Trabajo',
      text: 'Creación de puestos de trabajo para un mayor control de nuestras sedes.',
    },
    {
      icon: 'bi bi-geo-alt',
      title: 'Geolocalitzación',
      text: 'Guardamos la posición exacta de nuestros fichajes a través de móvil.',
    },
    {
      icon: 'bi bi-shield-lock',
      title: 'Fraudes',
      text: 'Permite localizar fraudes relacionados con el cambio de horas de los dispositivos o FAKE positions.',
    },
    {
      icon: 'bi bi-file-earmark-bar-graph',
      title: 'Informes',
      text: 'Disponemos de varios informes oficiales y además posibilidad de exportar fichajes filtrados.',
    },
  ];

  groupedCards = this.groupByThree(this.cards);

  private groupByThree(cards: any[]): any[][] {
    const grouped: any[][] = [];
    for (let i = 0; i < cards.length; i += 3) {
      grouped.push(cards.slice(i, i + 3));
    }
    return grouped;
  }

  heroImage = 'assets/images/pc-exemple.png';

  heroImage2 = 'assets/images/mobil1.png';

  heroImage3 = 'assets/images/tablet1.png';

}
