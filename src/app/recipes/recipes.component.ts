import { Component } from "@angular/core";
import { Recipe } from "../shared/recipes.model";

@Component({
  selector: "app-recipes",
  templateUrl: "recipes.component.html",
  styleUrls: ["recipes.component.scss"]
})
export class RecipesComponent {
  selectedRecipe: Recipe;
  constructor() {}

  setDisplayRecipe = recipe => {
    this.selectedRecipe = recipe;
  };
}
