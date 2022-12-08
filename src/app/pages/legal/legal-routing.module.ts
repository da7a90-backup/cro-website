import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LegalComponent } from './legal.component'

const routes: Routes = [
    {
        path: 'legal',
        component: LegalComponent,
    },
    {
        path: 'legal/:urlPath',
        component: LegalComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LegalRoutingModule {}
