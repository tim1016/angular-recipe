import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { RecipeService } from "../Recipe.service";

@Component({
  selector: "app-recipes-edit",
  templateUrl: "./recipes-edit.component.html",
  styleUrls: ["./recipes-edit.component.scss"]
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDescription),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
  onSubmit() {
    console.log(this.recipeForm);
  }
}
