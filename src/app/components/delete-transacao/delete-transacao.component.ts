import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
}
