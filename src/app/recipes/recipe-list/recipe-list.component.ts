import { Component } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"]
})
export class RecipeListComponent {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
