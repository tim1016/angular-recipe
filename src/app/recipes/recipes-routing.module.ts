import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeStartComponent, pathMatch: "full" },
      { path: "new", component: RecipesEditComponent },
      {
        path: ":id",
        component: RecipeDetailsComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit",
        component: RecipesEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
