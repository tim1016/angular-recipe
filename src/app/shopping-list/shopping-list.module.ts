import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: "shopping", component: ShoppingListComponent }
    ])
  ],
  exports: []
})
export class ShoppingListModule {}
