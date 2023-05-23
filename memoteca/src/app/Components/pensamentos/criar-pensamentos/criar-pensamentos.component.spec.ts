import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPensamentosComponent } from './criar-pensamentos.component';

describe('CriarPensamentosComponent', () => {
  let component: CriarPensamentosComponent;
  let fixture: ComponentFixture<CriarPensamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPensamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPensamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
