import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CareersRoutingModule } from './careers-routing.module'
import { CareersComponent } from './careers.component'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
    declarations: [CareersComponent],
    imports: [CommonModule, CareersRoutingModule, MatIconModule]
})
export class CareersModule {}
