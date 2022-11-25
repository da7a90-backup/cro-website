import { Directive, HostListener, Output, EventEmitter } from '@angular/core'

@Directive({
    selector: '[scrollUpTracker]',
})
export class ScrollUpTrackerDirective {
    @Output() scrolled = new EventEmitter<any>()

    @HostListener('scroll', ['$event'])
    onScroll(event) {
        let endReached = false
        if (event.target.scrollTop === 0) {
            endReached = true
        }
        this.scrolled.emit({
            pos: event.target.scrollTop,
            endReached
        })
    }
}