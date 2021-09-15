import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { userDTO } from 'src/app/dtos/userDTO';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: string = 'http://localhost:3001/users';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<userDTO[]>(this.url)
      .pipe(retry(3), catchError(this.handleError));
  }

  postUser(newUser: userDTO) {
    console.log(newUser.email);
    return this.http
      .post<userDTO>(this.url, newUser)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
