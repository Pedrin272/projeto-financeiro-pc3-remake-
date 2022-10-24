import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { Products } from 'src/app/models/produto.service';
import { ProdutosService } from 'src/app/models/produtos.service';
import { DeleteProdutoComponent } from '../delete-produto/delete-produto.component';
import { FormProdutoComponent } from '../form-produto/form-produto.component';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.scss'],
})
export class Pagina1Component implements OnInit, AfterViewInit {
  produtos: any[] = [];
  dataSource: MatTableDataSource<Products> = new MatTableDataSource(
    this.produtos
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    valorVenda: new FormControl(0),
    estoque: new FormControl(0),
  });
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = false;
  displayedColumns: string[] = ['id', 'nome', 'valorVenda', 'estoque', 'acoes'];

  constructor(
    private router: Router,
    private productsService: ProdutosService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.buscaProdutos();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
  }
  callDrawer() {
    return '1';
  }
  openSideNav() {
    return { 'margin-left': '250px', transition: '0.5s', width: '100%' };
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '400px';
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(FormProdutoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.productsService.isertOrUpdate(data).subscribe((v) => {
        this.buscaProdutos();
      });
    });
  }
  onEdit(element: Partial<Products>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '400px';
    dialogConfig.data = element;

    const dialogRef = this.dialog.open(FormProdutoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.productsService.isertOrUpdate(data).subscribe((v) => {
        this.buscaProdutos();
      });
    });
  }

  onDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(DeleteProdutoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.id) {
        this.productsService.delete(data.id).subscribe((v) => {
          console.log(data);
          this.buscaProdutos();
        });
      } else {
        console.log('No Id');
        this.buscaProdutos();
      }
    });
  }
  thisDelete(element: Partial<Products>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(DeleteProdutoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.id) {
        this.productsService.delete(data).subscribe((v) => {
          console.log(data);
          this.buscaProdutos();
        });
      } else {
        console.log('No Id');
        this.buscaProdutos();
      }
    });
  }

  navegarPara(rota: any[]) {
    this.router.navigate(rota);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    let that = this;

    this.productsService
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
    let that = this;

    this.productsService.selectAll(this.currentPage, this.pageSize).subscribe({
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
  populaDataSource(transacoes: Products[]) {
    this.dataSource = new MatTableDataSource(transacoes);
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.buscaProdutos();
  }
}
