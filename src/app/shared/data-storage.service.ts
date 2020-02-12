import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "./recipes.model";
import { RecipeService } from "../recipes/Recipe.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  domainUrl = "https://angular-recipes-3b398.firebaseio.com/";

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(this.domainUrl + "recipes.json", recipes)
      .subscribe(responsedata => {
        console.log(responsedata);
      });
  }
}
