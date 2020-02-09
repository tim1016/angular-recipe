import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-recipes",
  templateUrl: "recipes.component.html",
  styleUrls: ["recipes.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecipesComponent implements OnInit, OnDestroy {
  ngOnInit() {}

  ngOnDestroy() {}
}
