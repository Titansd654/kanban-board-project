import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStriketh]'
})
export class StrikethDirective implements OnInit{
  @Input() appStriketh = false;

  constructor(private el: ElementRef, private rendeder: Renderer2) { }

  ngOnInit(): void {
    this.updateStyle();
  }

  ngOnChanges() {
    this.updateStyle();
  }

  private updateStyle() {
    if(this.appStriketh) {
      this.rendeder.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
    }
    else {
      this.rendeder.removeStyle(this.el.nativeElement, 'text-decoration');
    }
  }

}
