import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject, takeUntil } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  email : string,
  password : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  notifier = new Subject();

  constructor(private httpClient: HttpClient, private router : Router) {}

  login(user : User) {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    return this.httpClient.post('http://localhost:3000/login', user)
    .pipe(
      takeUntil(this.notifier),
      catchError((err) => {
        alert(err.error?.message ?? "Smth went wrong!")
        return of();
      })
    )
    .subscribe(
      res => {
        this.setSession(res);
        alert("You have logged in!")
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
