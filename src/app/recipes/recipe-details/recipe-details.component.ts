import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.scss"]
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;
  showDropdown = false;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}
  toShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
