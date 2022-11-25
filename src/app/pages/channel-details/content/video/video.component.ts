import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { StreamingService } from '../../../../services/streaming.service'
import { FunFactService } from '../../../../services/funFact.service'

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
    @ViewChild('screenContainer') screenContainer: ElementRef
    public funFact: string

    constructor(
        private funFactService: FunFactService,
        public streamingService: StreamingService
    ) {}

    async ngOnInit() {
        const funFact = await this.funFactService.getRandomFunFact()
        if (funFact) {
            this.funFact = funFact.text
        }
    }

    sideScroll(direction) {
        this.screenContainer.nativeElement.scrollTo({
            top: 0,
            left:
                this.screenContainer.nativeElement.scrollLeft +
                (direction === 'left' ? -1 : 1) * this.screenContainer.nativeElement.clientWidth,
            behavior: 'smooth'
        })
    }
}
