import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[ToggleMenu]'
})

export class ToggleMenuDirective {

    constructor(private el: ElementRef) {
    }

    //@Input() defaultColor: string;
    //@Input('appHighlight') highlightColor: string;

    private getCurrColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        //this.getCurrColor = this.el.nativeElement.style.backgroundColor;
        //this.highlight(this.highlightColor || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        //this.highlight(this.getCurrColor);
    }

    @HostListener('click') onClick() {
        document.getElementById('sidebar').classList.toggle('active');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
