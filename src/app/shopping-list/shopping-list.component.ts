import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Cardamom", 1),
    new Ingredient("Tea", 2)
  ];
  constructor() {}

  ngOnInit() {}
  addToIngredientList(ingredient: Ingredient) {
    console.log(ingredient);
    this.ingredients.push(ingredient);
  }
}
