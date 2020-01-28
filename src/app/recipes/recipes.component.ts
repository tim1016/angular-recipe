import { Component } from "@angular/core";
import { Recipe } from "./recipes.model";

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
