import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../shared/recipes.model";
import { RecipeService } from "./Recipe.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipes",
  templateUrl: "recipes.component.html",
  styleUrls: ["recipes.component.scss"],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  paramsSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(recipe => {
      this.selectedRecipe = recipe;
    });

    let id = +this.route.snapshot.queryParams["id"];
    const paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        id = +params["id"];
      }
    );
    this.selectedRecipe = this.recipeService.getRecipeById(id);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
