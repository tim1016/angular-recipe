import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "./Shopping.service";
import { Subscription } from "rxjs";
import { LoggingService } from "src/logging.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.ingredientsSubscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    // this.loggingService.printLog("Hello from shopping component ngOnInit");
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

  getIngredientList() {
    this.ingredients = this.shoppingService.getIngredient();
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
