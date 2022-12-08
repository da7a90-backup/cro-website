import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared/shared.module'
import { LegalRoutingModule } from './legal-routing.module'
import { LegalComponent } from './legal.component'
@NgModule({
    imports: [CommonModule, SharedModule, LegalRoutingModule],
    declarations: [
        LegalComponent
    ],
    providers: []
})
export class LegalModule {}
