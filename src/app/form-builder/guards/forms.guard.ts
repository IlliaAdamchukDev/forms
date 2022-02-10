import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormsGuard implements CanActivate {
  constructor(private router: Router, private httpClient: HttpClient) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.httpClient
      .get<{ message: string }>('http://localhost:3000/forms')
      .pipe(
        map((data) => {
          if (data.message !== 'Valid') {
            this.router.navigate(['/']);
          }
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }
}
