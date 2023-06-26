import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appBorderColorAnswer]'
})
export class BorderColorAnswerDirective {

  private initialColot: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  public newColor: string = "red";
  private defaultHeight: number = 50;

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColot);
    this.setHeight(this.defaultHeight);
  }

  @Input("appPkmnBorderCard") borderColor= "green";

  private setBorder(color: string) {
    const border = "solid 4px " + color;
    this.el.nativeElement.style.border = border;
  }

  /* @HostListener: Decorator that declares a DOM event to listen for,
  and provides a handler method to run when that event occurs. */
  @HostListener("mouseenter") onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = "green";
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = "";
    this.setBorder(this.initialColot);
  }
  @HostListener("onClick") onClick() {
    this.changeBackgroundColor("green");
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + "px";
  }

  private changeBackgroundColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

 /* @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.changeBackgroundColor('yellow');
    }
  }*/

}
