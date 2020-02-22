import { Actions, ofType, Effect } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
// import { AuthResponseData } from "../auth.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind?: string;
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  signupRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
  signinRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.signinRoute, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map((resData: AuthResponseData) => {
            const expirationdate = new Date(
              new Date().getTime() + parseFloat(resData.expiresIn) * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationdate
            });
          }),
          catchError(this.handleError)
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private handleError = (errorResponse: HttpErrorResponse) => {
    console.log(errorResponse);
    let errorMessage = "An unknown error took place";
    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthActions.LoginFail(errorMessage));
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
    return of(new AuthActions.LoginFail(errorMessage));
  };
}
