import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject, takeUntil, take } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component'

export interface User {
  email : string,
  password : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  notifier = new Subject();
  private isButton = new Subject<{button : boolean, disabled : boolean}>();
  isButton$ = this.isButton.asObservable();

  constructor(private httpClient: HttpClient, private router : Router, private dialog: MatDialog) {}

  login(user : User) {
    this.isButton.next({button: false, disabled : true});
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    return this.httpClient.post('http://localhost:3000/login', user)
    .pipe(
      takeUntil(this.notifier),
      catchError((err) => {
        this.isButton.next({button: true, disabled : true});
        this.dialog.open(DialogComponent, {
          data : {
            message: err.error?.message ?? "Smth went wrong!",
          }
        })
        .afterClosed()
        .pipe(
          take(1)
        )
        .subscribe(
          () => {
            this.isButton.next({button: true, disabled : false})
          }
        )
        return of();
      })
    )
    .subscribe(
      res => {
        this.isButton.next({button: true, disabled : true});
        this.setSession(res);
        this.dialog.open(DialogComponent, {
          data : {
            message: "You have logged in!",
          }
        })
        .afterClosed()
        .pipe(
          take(1)
        )
        .subscribe(
          () => {
            this.isButton.next({button: true, disabled : false})
          }
        )
        this.router.navigate(['/forms']);
      }
    )
  }

  private setSession(authResult : any) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", authResult.expires);
  } 

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
      return this.getExpiration() > Date.now();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = expiration ? expiration : 0;
      return expiresAt;
  }    

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
