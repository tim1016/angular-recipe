import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../Shopping.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;
  newIngredient: Ingredient;
  constructor(private slService: ShoppingService) {}
  ngOnInit() {}
  addIngredient() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    this.slService.addToIngredientList(new Ingredient(name, amount));
  }
}
