import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss'],
})
export class FormProdutoComponent implements OnInit {
  
  description: string;
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl(''),
    valorVenda: new FormControl(0),
    estoque: new FormControl(0),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    this.description = data.description;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      nome: [''],
      valorVenda: [0],
      estoque: [0],
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
