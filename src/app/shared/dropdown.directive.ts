import {
  Directive,
  HostListener,
  HostBinding,
  Renderer2,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding("class.show") isOpen = false;
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
    this.toggleShowClass();
  }

  toggleShowClass() {
    const dropdownMenu = this.renderer.nextSibling(this.elRef.nativeElement);

    if (dropdownMenu.classList.contains("show")) {
      this.renderer.addClass(dropdownMenu, "show");
    } else {
      this.renderer.removeClass(dropdownMenu, "show");
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
