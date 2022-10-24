import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
export class PaginaPrincipalComponent implements OnInit, AfterViewInit {
  transacoes: any = [];
  dataSource: MatTableDataSource<Transacao> = new MatTableDataSource(
    this.transacoes
  );

  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = false;
  displayedColumns: string[] = ['id', 'createdAt', 'tipo', 'valor', 'saldo'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private transacaoService: TransacaoService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buscaProdutos();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
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
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    let that = this;

    this.transacaoService
      .selectAll(this.currentPage, this.pageSize, filterValue)
      .subscribe({
        next(response) {
          // that.dataSource.paginator.firstPage();
          that.paginator.pageIndex = that.currentPage;
          that.paginator.length = response.totalElements;
          that.dataSource = new MatTableDataSource(response.content);
        },
        error(err) {
          console.error(err);
        },
        complete() {
          console.log('requisição completa');
        },
      });
  }

  buscaProdutos() {
    this.isLoading = true;

    let that = this;

    this.transacaoService.selectAll(this.currentPage, this.pageSize).subscribe({
      next(resposta) {
        that.paginator.pageIndex = that.currentPage;
        that.paginator.length = resposta.totalElements;

        that.populaDataSource(resposta.content);
      },
      error(err) {
        console.error(err);
      },
      complete() {
        that.isLoading = false;
      },
    });
  }
  populaDataSource(transacoes: Transacao[]) {
    this.dataSource = new MatTableDataSource(transacoes);
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.buscaProdutos();
  }
}
