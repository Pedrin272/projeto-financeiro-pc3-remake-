import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../../models/produto.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss'],
})
export class FormProdutoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl(''),
    valorVenda: new FormControl(0),
    estoque: new FormControl(0),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Products
  ) {
    if (data && data.id) {
      this.form.patchValue(data);
    }
  }
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.form = this.fb.group({
        id: [this.data.id],
        nome: [ this.data.nome],
        valorVenda: [this.data.valorVenda],
        estoque: [this.data.estoque],
      });
    }
    else {
      this.form = this.fb.group({
        id: [''],
        nome: [''],
        valorVenda: [''],
        estoque: [''],
      });
    }
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
