import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "recipes";
  loadedFeature = "recipes";
  onNavigate(navString: string): void {
    this.loadedFeature = navString;
  }
}
