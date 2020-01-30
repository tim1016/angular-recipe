import { Component, OnInit, OnChanges } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "./Shopping.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  getIngredientList() {
    this.ingredients = this.shoppingService.getIngredient();
  }
}
