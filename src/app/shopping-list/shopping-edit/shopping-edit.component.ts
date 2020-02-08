import { Component, OnInit, OnDestroy } from "@angular/core";
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
  // @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;
  newIngredient: Ingredient;
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;

  constructor(private slService: ShoppingService) {}
  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(id => {
      this.editMode = true;
      this.editedItemIndex = id;
    });
  }
  onAddItem(form: NgForm) {
    console.log(form);
    const value = form.value;
    this.slService.addToIngredientList(
      new Ingredient(value.name, value.amount)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
