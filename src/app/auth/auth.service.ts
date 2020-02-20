import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import * as fromAuth from "./store/auth.reducer";
import * as fromApp from "../store/app.reducer";
import * as authActions from "./store/auth.actions";

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
  signupRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
  signinRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  // user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: NodeJS.Timer = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupRoute, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signinRoute, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        })
      );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(
        new authActions.Login({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._expirationDate)
        })
      );
      // this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: string
  ) {
    const expirationdate = new Date(
      new Date().getTime() + parseFloat(expiresIn) * 1000
    );
    const user = new User(email, id, token, expirationdate);
    this.store.dispatch(
      new authActions.Login({
        email: email,
        userId: id,
        token: token,
        expirationDate: expirationdate
      })
    );
    // this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
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
