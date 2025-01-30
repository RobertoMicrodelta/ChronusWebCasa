import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirUnaDemoComponent } from './pedir-una-demo.component';

describe('PedirUnaDemoComponent', () => {
  let component: PedirUnaDemoComponent;
  let fixture: ComponentFixture<PedirUnaDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedirUnaDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedirUnaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
