import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = "recipes";
  loadedFeature: string = "recipes";
  onNavigate(navString: string): void {
    this.loadedFeature = navString;
    console.log(this.loadedFeature);
  }
}
