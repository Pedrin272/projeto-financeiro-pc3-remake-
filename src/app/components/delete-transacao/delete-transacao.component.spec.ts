import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransacaoComponent } from './delete-transacao.component';

describe('DeleteTransacaoComponent', () => {
  let component: DeleteTransacaoComponent;
  let fixture: ComponentFixture<DeleteTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTransacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
