import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Unsubscriber } from '../../shared/unsubscriber/unsubscriber';
import { validateEmail } from './utils/login-functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Unsubscriber {
  public authForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  public isLoading$!: Observable<boolean>;

  constructor(private authService: AuthService, private matDialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.isLoading$ = this.authService.isLoading$.asObservable();
  }

  public login(): void {
    if (
      this.authForm.valid &&
      validateEmail(this.authForm.controls['email'].value)
    ) {
      this.authService.login({
        email: this.authForm.controls['email'].value,
        password: this.authForm.controls['password'].value,
      });
      return;
    }
    this.matDialog.open(DialogComponent, {
      data: {
        message: 'Invalid data',
      },
    });
  }
}
