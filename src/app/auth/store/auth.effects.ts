import { Actions, ofType, Effect } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
// import { AuthResponseData } from "../auth.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  kind?: string;
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //	The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const { email, localId, idToken, expiresIn } = resData;
  const expirationdate = new Date(
    new Date().getTime() + parseFloat(expiresIn) * 1000
  );
  const user = new User(email, localId, idToken, expirationdate);
  localStorage.setItem("userData", JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate: expirationdate
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  console.log(errorResponse);
  let errorMessage = "An unknown error took place";
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  signupRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
  signinRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(this.signupRoute, {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        })
        .pipe(
          tap(resData =>
            this.authService.setLogOutTimer(+resData.expiresIn * 1000)
          ),
          map(handleAuthentication),
          catchError(handleError)
        );
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem("userData");
      this.authService.clearLogoutTimer();
      this.router.navigate(["/auth"]);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _expirationDate: string;
      } = JSON.parse(localStorage.getItem("userData"));
      if (!userData) return { type: "DUMMY" };

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._expirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._expirationDate).getTime() - new Date().getTime();
        this.authService.setLogOutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._expirationDate)
        });
      }
      return { type: "DUMMY" };
    })
  );

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
          tap(resData =>
            this.authService.setLogOutTimer(+resData.expiresIn * 1000)
          ),
          map(handleAuthentication),
          catchError(handleError)
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
