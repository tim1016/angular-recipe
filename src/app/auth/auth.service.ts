import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind?: string;
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  apiKey = "AIzaSyDuF5cnQUaEG7ZThWf6-dyofS1-pZrrfIs";
  signupRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  signinRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupRoute, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signinRoute, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = "An unknown error took place";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is incorrect";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this email";
        break;
      case "USER_DISABLED":
        errorMessage = "This account has been disabled";
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
