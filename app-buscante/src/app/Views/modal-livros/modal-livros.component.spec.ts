import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLivrosComponent } from './modal-livros.component';

describe('ModalLivrosComponent', () => {
  let component: ModalLivrosComponent;
  let fixture: ComponentFixture<ModalLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
