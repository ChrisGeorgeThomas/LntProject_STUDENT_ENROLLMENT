import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLimitedSeatsHighlight]',
  standalone: true
})
export class LimitedSeatsHighlightDirective implements OnInit {
  @Input() appLimitedSeatsHighlight: { availableSeats: number; maxSeats: number } | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appLimitedSeatsHighlight) {
      const { availableSeats, maxSeats } = this.appLimitedSeatsHighlight;
      const occupancyRate = (maxSeats - availableSeats) / maxSeats;

      if (occupancyRate >= 0.9) {
        // Highlight in red if 90% or more occupied
        this.el.nativeElement.style.backgroundColor = '#ffcccc';
        this.el.nativeElement.style.borderLeft = '4px solid #f44336';
      } else if (occupancyRate >= 0.7) {
        // Highlight in yellow if 70% or more occupied
        this.el.nativeElement.style.backgroundColor = '#fff9c4';
        this.el.nativeElement.style.borderLeft = '4px solid #fbc02d';
      } else {
        // Green for plenty of seats
        this.el.nativeElement.style.backgroundColor = '#c8e6c9';
        this.el.nativeElement.style.borderLeft = '4px solid #4caf50';
      }
    }
  }
}
