import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter, Output } from "@angular/core";

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("Cardamom", 1),
    new Ingredient("Tea", 2)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  getIngredient() {
    return this.ingredients.slice();
  }

  addToIngredientList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients);
  }
}
