import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";
import { Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.scss"]
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;
  showDropdown = false;
  paramsSubscription: Params;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }
  toShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
