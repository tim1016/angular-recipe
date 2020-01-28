import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "recipes";
  navigate: string = "";
  setNav(navString) {
    this.navigate = navString;
    console.log(this.navigate);
  }
}
