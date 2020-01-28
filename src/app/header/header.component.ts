import { Component, OnInit, Output, EventEmitter } from "@angular/core";
// import {  } from 'protractor';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  navString: string = "";
  constructor() {}

  ngOnInit() {}
  navToShopping = () => {
    this.navString = "shopping";
    this.navigate.emit(this.navString);
  };
  navToRecipes = () => {
    this.navString = "recipes";
    this.navigate.emit(this.navString);
  };
}
