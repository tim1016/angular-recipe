import { Ingredient } from "../shared/ingredient.model";
// import { EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("Cardamom", 1),
    new Ingredient("Tea", 2)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredient() {
    return this.ingredients.slice();
  }

  addToIngredientList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  fetchIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
