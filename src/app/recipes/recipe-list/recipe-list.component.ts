import { Component } from "@angular/core";
import { Recipe } from "../recipes.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"]
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      "A test recipe",
      "test Description for the recipe",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    )
  ];
  constructor() {}
}
