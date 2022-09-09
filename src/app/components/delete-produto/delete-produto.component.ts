import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmacaoComponent } from 'src/app/shared/confirmacao/confirmacao.component';

@Component({
  selector: 'app-delete-produto',
  templateUrl: './delete-produto.component.html',
  styleUrls: ['./delete-produto.component.scss'],
})
export class DeleteProdutoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
  });
  description: string;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeleteProdutoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.description = data.description;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
  onConfirm() {
    console.log('confirmado');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(ConfirmacaoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: boolean) => {
      console.log(data);
      if (data === true) {
        this.save();
      } else {
        this.close();
      }
    });
  }
}
