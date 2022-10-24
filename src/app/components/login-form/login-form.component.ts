import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../models/user/user-service';
import { User } from '../../models/user/user-model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}
  form: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  ngOnInit(): void {}
  hide = true;
  onSubmit() {
    console.log(this.form.value);
    let a = this.form.value;

    let request = this.userService.validUser(a.username, a.password);
    if (request) {
      console.log('usuario valido');
      this.route.navigate(['' + '/pagina1']);
    } else {
      console.log('User Invalido');
    }
  }
}
