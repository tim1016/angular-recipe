import { Ingredient } from "../shared/ingredient.model";
// import { EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";

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
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
