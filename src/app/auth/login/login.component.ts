import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Unsubscriber } from './../../shared/unsubscriber/unsubscriber';
import { validateEmail } from './utils/login-functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Unsubscriber {
  public isButton = { button: true, disabled: false };
  public auth: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.authService.isButton$
    .pipe(takeUntil(this.notifier$))
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

  ngDoCheck() {
    this.changeDetectorRef.markForCheck();
  }

  public login(): void {
    if (this.auth.valid && validateEmail(this.auth.controls['email'].value)) {
      this.authService.login({
        email: this.auth.controls['email'].value,
        password: this.auth.controls['password'].value,
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
