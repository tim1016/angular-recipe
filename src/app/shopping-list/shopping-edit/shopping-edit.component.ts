import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../Shopping.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  @ViewChild("f", { static: false }) slForm: NgForm;
  newIngredient: Ingredient;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  subscription: Subscription;

  constructor(private slService: ShoppingService) {}
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
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addToIngredientList(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
