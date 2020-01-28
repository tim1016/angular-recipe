import { Component, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"]
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      "A test recipe",
      "test Description for the recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    ),
    new Recipe(
      "A second test recipe",
      "Second test description for the recipe",
      "https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428928_960_720.jpg"
    )
  ];
  constructor() {}
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
