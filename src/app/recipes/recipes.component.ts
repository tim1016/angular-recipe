import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";

import { RecipeService } from "./Recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "recipes.component.html",
  styleUrls: ["recipes.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  ngOnInit() {}

  ngOnDestroy() {}
}
