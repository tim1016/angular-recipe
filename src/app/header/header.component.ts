import { Component, OnInit, Output, EventEmitter } from "@angular/core";
// import {  } from 'protractor';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  navString: string = "";
  constructor() {}

  ngOnInit() {}
  onSelect = selection => {
    this.featureSelected.emit(selection);
  };
}
