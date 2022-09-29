import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransacaoService } from 'src/app/models/transacao/transacao.service';
import { DeleteTransacaoComponent } from '../delete-transacao/delete-transacao.component';
import { FormTransacaoComponent } from '../form-transacao/form-transacao.component';
import { Transacao } from './../../models/transacao/transacao.model';

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
    id: new FormControl(0),
    createdAt: new FormControl(''),
    tipo: new FormControl(''),
    valor: new FormControl(0),
    saldo: new FormControl(0),
  });

  displayedColumns: string[] = ['id', 'createdAt', 'tipo', 'valor', 'saldo'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private transacaoService: TransacaoService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscaProdutos();
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(FormTransacaoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.transacaoService.isertOrUpdate(data).subscribe((v) => {
        this.buscaProdutos();
      });
    });
  }
  onDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(DeleteTransacaoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.id) {
        this.transacaoService.delete(data.id).subscribe((v) => {
          console.log(data);
          this.buscaProdutos();
        });
      } else {
        console.log('não deletou');
      }
    });
  }
  valor() {}

  navegarPara(rota: any[]) {
    this.router.navigate(rota);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  buscaProdutos() {
    let that = this;

    this.transacaoService.selectAll().subscribe({
      next({ items }) {
        console.log(items);
        that.dataSource = new MatTableDataSource(items);
        that.dataSource.paginator = that.paginator;
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log('requisição completa');
      },
    });
  }
}
