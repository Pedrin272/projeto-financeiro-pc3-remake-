import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/produto.service';
import { ProdutosService } from 'src/app/models/produtos.service';
import { FormProdutoComponent } from '../form-produto/form-produto.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.scss'],
})
export class Pagina1Component implements OnInit {
  produtos: Products[] = [];
  displayedColumns: string[] = ['id', 'nome', 'valorVenda', 'estoque'];
  dataSource: any;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    valorVenda: new FormControl(0),
    estoque: new FormControl(0),
  });
  constructor(
    private router: Router,
    private productsService: ProdutosService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    let that = this;

    this.productsService.selectAll().subscribe({
      next(produtos) {
        console.log(produtos);
        that.dataSource = new MatTableDataSource(produtos);
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log('requisição completa');
      },
    });
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    this.dialog.open(FormProdutoComponent, dialogConfig);
  }
  onDelete() {}

  navegarPara(rota: any[]) {
    this.router.navigate(rota);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
