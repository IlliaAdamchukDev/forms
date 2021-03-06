import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormsGuard implements CanActivate {
  constructor(private router: Router, private httpClient: HttpClient) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.httpClient.get<{ message: string }>('/api/forms').pipe(
      map((data: { message: string }): boolean => {
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
