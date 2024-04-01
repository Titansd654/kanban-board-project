import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppIconColor]'
})
export class AppIconColorDirective implements OnInit {
  @Input() appAppIconColor = '';

  constructor(private el: ElementRef, private rendeder: Renderer2) { }

  ngOnInit(): void {
    this.updateStyle();
  }

  ngOnChanges() {
    this.updateStyle();
  }

  private updateStyle() {
    if(this.appAppIconColor) {
      this.rendeder.setStyle(this.el.nativeElement, 'color', this.appAppIconColor);
    }
    else {
      this.rendeder.removeStyle(this.el.nativeElement, 'color');
    }
  }

}
