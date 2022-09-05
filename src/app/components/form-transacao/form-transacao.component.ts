import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-form-transacao',
  templateUrl: './form-transacao.component.html',
  styleUrls: ['./form-transacao.component.scss']
})
export class FormTransacaoComponent implements OnInit {

  description: string;
  form: FormGroup = new FormGroup({
    createdAt: new FormControl(''),
    tipo: new FormControl(''),
    valor: new FormControl(0),
    saldo: new FormControl(0),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    this.description = data.description;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      createdAt: [''],
      tipo: [''],
      valor: [''],
      saldo: [''],
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
