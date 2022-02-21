import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  of,
  BehaviorSubject,
  takeUntil,
  take,
  Subscription,
  Observable,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Unsubscriber } from 'src/app/shared/unsubscriber/unsubscriber';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Unsubscriber {
  public isButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private matDialog: MatDialog
  ) {
    super();
  }

  public login(user: User): Subscription {
    this.isButton$.next(false);
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    return this.httpClient
      .post('/api/login', user)
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => {
          this.isButton$.next(true);
          this.matDialog.open(DialogComponent, {
            data: {
              message: err.error?.message ?? 'Smth went wrong!',
            },
          });
          return of();
        })
      )
      .subscribe(
        (res: { token?: string; expires?: string; message?: string }) => {
          this.isButton$.next(true);
          this.setSession(res);
          this.matDialog.open(DialogComponent, {
            data: {
              message: 'You have logged in!',
            },
          });
          this.router.navigate(['/forms']);
        }
      );
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return +this.getExpiration() > Date.now();
  }

  public getExpiration(): string {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = expiration?.length ? expiration : '0';
    return expiresAt;
  }

  private setSession(authResult: {
    token?: string;
    expires?: string;
    message?: string;
  }) {
    localStorage.setItem('id_token', authResult?.token ?? '');
    localStorage.setItem('expires_at', authResult?.expires ?? '');
  }
}
