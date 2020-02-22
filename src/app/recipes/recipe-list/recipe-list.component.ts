import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../../shared/recipes.model";
import { RecipeService } from "../Recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.subscription = this.store
      .select("recipes")
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
