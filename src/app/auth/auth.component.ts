import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.css"]
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    this.isLoading = true;
    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
