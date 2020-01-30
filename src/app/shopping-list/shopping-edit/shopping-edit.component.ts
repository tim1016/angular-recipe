import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  newIngredient: Ingredient;
  constructor() {}
  ngOnInit() {}

  addIngredient() {
    this.newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );
    this.ingredientAdded.emit(this.newIngredient);
  }
}
