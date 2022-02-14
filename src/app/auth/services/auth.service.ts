import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, Subject, takeUntil, take, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public notifier = new Subject();
  private isButton = new Subject<{ button: boolean; disabled: boolean }>();
  public isButton$ = this.isButton.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  public login(user: User): Subscription {
    this.isButton.next({ button: false, disabled: true });
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    return this.httpClient
      .post('http://localhost:3000/login', user)
      .pipe(
        takeUntil(this.notifier),
        catchError((err) => {
          this.isButton.next({ button: true, disabled: true });
          this.dialog
            .open(DialogComponent, {
              data: {
                message: err.error?.message ?? 'Smth went wrong!',
              },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
              this.isButton.next({ button: true, disabled: false });
            });
          return of();
        })
      )
      .subscribe(
        (res: { token?: string; expires?: string; message?: string }) => {
          this.isButton.next({ button: true, disabled: true });
          this.setSession(res);
          this.dialog
            .open(DialogComponent, {
              data: {
                message: 'You have logged in!',
              },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
              this.isButton.next({ button: true, disabled: false });
            });
          this.router.navigate(['/forms']);
        }
      );
  }

  private setSession(authResult: {
    token?: string;
    expires?: string;
    message?: string;
  }) {
    localStorage.setItem('id_token', authResult?.token ?? '');
    localStorage.setItem('expires_at', authResult?.expires ?? '');
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

  ngOnDestroy(): void {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
