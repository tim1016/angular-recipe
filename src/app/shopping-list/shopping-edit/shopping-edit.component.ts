import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../Shopping.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  newIngredient: Ingredient;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  subscription: Subscription;

  constructor(
    private slService: ShoppingService,
    private store: Store<fromShoppingList.AppState>
  ) {}
  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(id => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedItem = this.slService.fetchIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    );
    this.onClear();
  }
}
