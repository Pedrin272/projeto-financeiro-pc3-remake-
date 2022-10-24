import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { LoginGuard } from 'src/app/guard/login.guard';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private guard: LoginGuard,
    private route: ActivatedRoute,
    private routeState: RouterStateSnapshot
  ) {}
  form: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  ngOnInit(): void {}
  hide = true;
  onSubmit() {
    console.log(this.form.value);
  }
}
