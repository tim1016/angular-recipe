import { Recipe } from "../shared/recipes.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/Shopping.service";
// import { RecipesComponent } from "./recipes.component";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "A test recipe",
      "test Description for the recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French fries", 20)]
    ),
    new Recipe(
      "A second test recipe",
      "Second test description for the recipe",
      "https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428928_960_720.jpg",
      [new Ingredient("Oil", 1), new Ingredient("Potatoes", 2)]
    )
  ];

  constructor(private slService: ShoppingService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number): Recipe {
    if (id < this.recipes.length) return this.recipes[id];
    else return new Recipe("Test", "Test", "Test", []);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(recipe: Recipe, index: number): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }
}
