import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "../shared/recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/Shopping.service";
import { Store } from "@ngrx/store";
import { shoppingListReducer } from "../shopping-list/store/shopping-list.reducer";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Tasty Schnitzel",
  //     "A super-tasty Schnitzel - just awesome!",
  //     "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
  //     [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
  //   ),
  //   new Recipe(
  //     "Big Fat Burger",
  //     "What else you need to say?",
  //     "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
  //     [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
  //   )
  // ];

  constructor(
    private slService: ShoppingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // this.slService.addIngredients(ingredients);
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
