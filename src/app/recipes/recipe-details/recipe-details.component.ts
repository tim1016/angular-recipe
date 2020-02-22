import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { map, switchMap } from "rxjs/operators";
import * as RecipesActions from "../store/recipe.actions";

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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .pipe(
        map(params => {
          return +params["id"];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select("recipes");
        }),
        map(recipesState =>
          recipesState.recipes.find((recipe, index) => index === this.id)
        )
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });

    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params["id"];
    //     this.store
    //       .select("recipes")
    //       .pipe(
    //         map(recipesState =>
    //           recipesState.recipes.find(
    //             (recipe, index) => index === this.id
    //           )
    //         )
    //       )
    //       .subscribe(recipe => {
    //         this.recipe = recipe;
    //       });
    //   }
    // );
  }
  toShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate([`edit`], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["recipes"]);
  }
}
