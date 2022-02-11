import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  notifier = new Subject();
  isButton = { button: true, disabled: false };
  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.authService.isButton$
      .pipe(takeUntil(this.notifier))
      .subscribe((val) => {
        this.isButton = val;
        if (this.isButton.disabled) {
          this.auth.controls['email'].disable();
          this.auth.controls['password'].disable();
        } else {
          this.auth.controls['email'].enable();
          this.auth.controls['password'].enable();
        }
      });
  }

  auth: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  login(): void {
    if (this.auth.valid) {
      this.authService.login({
        email: this.auth.controls['email'].value,
        password: this.auth.controls['password'].value,
      });
      return;
    }
    this.dialog
      .open(DialogComponent, {
        data: {
          message: 'Invalid data',
        },
      })
  }

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
