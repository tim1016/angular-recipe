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
  @Input() recipe: Recipe;
  @Input() id: number;
  paramsSubscription: Subscription;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() // private recipeService: RecipeService,
  // private route: ActivatedRoute
  {}

  ngOnInit() {}
}
