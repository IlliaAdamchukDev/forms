import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  auth : FormGroup = new FormGroup({
    email : new FormControl(),
    password : new FormControl()
  })

  login(): void {
    this.authService.login({
      email : this.auth.controls['email'].value,
      password: this.auth.controls['password'].value
    })
  }
}
