import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.scss"]
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;
  showDropdown = false;
  constructor() {}

  ngOnInit() {}
}
