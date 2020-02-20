import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "../shared/recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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

  deleteRecipe(id: number): void {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
