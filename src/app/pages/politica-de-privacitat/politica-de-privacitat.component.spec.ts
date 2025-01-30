import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaDePrivacitatComponent } from './politica-de-privacitat.component';

describe('PoliticaDePrivacitatComponent', () => {
  let component: PoliticaDePrivacitatComponent;
  let fixture: ComponentFixture<PoliticaDePrivacitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliticaDePrivacitatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticaDePrivacitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
