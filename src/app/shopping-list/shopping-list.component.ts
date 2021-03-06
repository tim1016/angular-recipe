import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  ngOnDestroy() {
    // this.ingredientsSubscription.unsubscribe();
  }

  getIngredientList() {
    // this.ingredients = this.shoppingService.getIngredient();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
