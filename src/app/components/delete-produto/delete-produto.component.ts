import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
