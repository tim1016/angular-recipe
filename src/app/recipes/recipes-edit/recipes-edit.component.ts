import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-recipes-edit",
  templateUrl: "./recipes-edit.component.html",
  styleUrls: ["./recipes-edit.component.scss"]
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });
  }

  private initForm() {}
}
