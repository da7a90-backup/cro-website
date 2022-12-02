import { DialogService } from '../../../services/dialog.service'
import { Component, Inject } from '@angular/core'
import { FunFactService } from '../../../services/funFact.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DialogData } from '../../../shared/dialog-data'

@Component({
    selector: 'app-add-fun-fact',
    templateUrl: './add-fun-fact.component.html',
    styleUrls: ['./add-fun-fact.component.scss']
})
export class AddFunFactComponent {
    public text: string
    constructor(
        private funFactService: FunFactService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddFunFactComponent>,
        private dialogService: DialogService
    ) {}

    createFunFact(text: string) {
        const dialogData: DialogData = {
            title: 'Confirm adding fun fact',
            message: `Are you sure you want to add the following fun fact: ${text}`,
            okText: 'CONFIRM',
            cancelText: 'CLOSE'
        }

        const dialogRef = this.dialogService.openDialog(dialogData, {
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                try {
                    await this.funFactService.createFunFact({ funFactText: text })
                    this.dialogRef.close()
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }
}
