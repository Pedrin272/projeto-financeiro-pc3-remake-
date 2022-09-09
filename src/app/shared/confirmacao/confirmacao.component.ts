import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
})
export class ConfirmacaoComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) data: boolean
  ) {}

  ngOnInit(): void {}
  confirmation() {
    console.log('confirmado');
    return true;
  }
  close() {
    this.dialogRef.close();
  }
}
