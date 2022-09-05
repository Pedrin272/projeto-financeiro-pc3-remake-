import { Transacao } from './../../models/transacao/transacao.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TransacaoService } from 'src/app/models/transacao/transacao.service';
import { FormControl, FormGroup } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss'],
})
export class PaginaPrincipalComponent implements OnInit {
  transacoes: Transacao[] = [];
  form: FormGroup = new FormGroup({
    id: new FormControl(0 ),
    createdAt: new FormControl(''),
    tipo: new FormControl(''),
    valor: new FormControl(0),
    saldo: new FormControl(0),
  });

  displayedColumns: string[] = ['id', 'createdAt', 'tipo', 'valor', 'saldo'];
  dataSource: any;

  constructor(
    private router: Router,
    private transacaoService: TransacaoService
  ) {}

  ngOnInit() {
    let that = this;

    this.transacaoService.selectAll().subscribe({
      next(transacoes) {
        console.log(transacoes);
        that.dataSource = new MatTableDataSource(transacoes);
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log('requisição completa');
      },
    });
  }

  navegarPara(rota: any[]) {
    this.router.navigate(rota);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
