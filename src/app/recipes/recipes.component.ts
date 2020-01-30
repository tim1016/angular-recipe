import { Component } from "@angular/core";
import { Recipe } from "../shared/recipes.model";
import { RecipeService } from "./Recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "recipes.component.html",
  styleUrls: ["recipes.component.scss"],
  providers: [RecipeService]
})
export class RecipesComponent {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(recipe => {
      this.selectedRecipe = recipe;
    });
  }
}
