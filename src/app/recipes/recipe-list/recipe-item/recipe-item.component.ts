import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Recipe } from "../../../shared/recipes.model";
import { RecipeService } from "../../Recipe.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-recipe-item",
  templateUrl: "recipe-item.component.html",
  styleUrls: ["recipe-item.component.scss"]
})
export class RecipeItemComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  paramsSubscription: Subscription;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // const id = this.route.snapshot.params["id"];
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }
}
