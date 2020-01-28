import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../../../shared/recipes.model";
@Component({
  selector: "app-recipe-item",
  templateUrl: "recipe-item.component.html",
  styleUrls: ["recipe-item.component.scss"]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }
}
