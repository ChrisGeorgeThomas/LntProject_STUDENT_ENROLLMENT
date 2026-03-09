import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appActiveEnrollment]',
  standalone: true
})
export class ActiveEnrollmentDirective implements OnInit {
  @Input() appActiveEnrollment: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appActiveEnrollment) {
      this.el.nativeElement.style.borderBottom = '3px solid #4caf50';
      this.el.nativeElement.style.fontWeight = '600';
    }
  }
}
