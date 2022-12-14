import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-careers',
    templateUrl: './careers.component.html',
    styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
    public message: string

    constructor() {}

    async ngOnInit() {
        this.message = 'We appreciate your interest in working with us. We are currently working on creating exciting opportunities within our company. We will be posting these careers soon, so please check back with us at a later date.'
    }
}
