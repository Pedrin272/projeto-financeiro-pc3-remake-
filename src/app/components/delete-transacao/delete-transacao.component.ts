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
  selector: 'app-delete-transacao',
  templateUrl: './delete-transacao.component.html',
  styleUrls: ['./delete-transacao.component.scss'],
})
export class DeleteTransacaoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
  });
  description: string;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,

    private dialogRef: MatDialogRef<DeleteTransacaoComponent>,
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
  onConfirm(confirm: boolean) {
    console.log('confirmado');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(ConfirmacaoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      console.log(confirm);
      if (confirm === true) {
        this.save();
      } else {
        this.close();
      }
    });
  }
}
