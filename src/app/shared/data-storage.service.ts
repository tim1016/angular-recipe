import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "./recipes.model";
import { RecipeService } from "../recipes/Recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipe.actions";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  domainUrl = "https://angular-recipes-3b398.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(this.domainUrl + "recipes.json", recipes)
      .subscribe(responsedata => {
        console.log(responsedata);
      });
  }

  fetchRecipes() {
    return this.store.select("auth").pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(this.domainUrl + "recipes.json", {
          params: new HttpParams().set("auth", user.token)
        });
      }),
      map(recipes => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
      })
    );
  }
}
