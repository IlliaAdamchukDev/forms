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
import { Unsubscriber } from '../../shared/unsubscriber/unsubscriber';
import { validateEmail } from './utils/login-functions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Unsubscriber {
  public isButton = { button: true, disabled: false };
  public authForm: FormGroup = new FormGroup({
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
          this.authForm.controls['email'].disable();
          this.authForm.controls['password'].disable();
        } else {
          this.authForm.controls['email'].enable();
          this.authForm.controls['password'].enable();
        }
      });
  }
  ngDoCheck() {
    this.changeDetectorRef.markForCheck();
  }

  public login(): void {
    if (this.authForm.valid && validateEmail(this.authForm.controls['email'].value)) {
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
