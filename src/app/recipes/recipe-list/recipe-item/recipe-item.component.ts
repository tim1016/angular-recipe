import { Component, Input } from "@angular/core";
import { SelectorContext } from "@angular/compiler";
import { Recipe } from "../../recipes.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "recipe-item.component.html",
  styleUrls: ["recipe-item.component.scss"]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
}
