import { Component } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"]
})
export class RecipeListComponent {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
}
