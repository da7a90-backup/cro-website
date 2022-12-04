import { Component, OnInit, ViewChild } from '@angular/core'
import { FunFactService as FunFactService } from '../../services/funFact.service'
import { AddFunFactComponent } from './add-fun-fact/add-fun-fact.component'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'app-fun-facts',
    templateUrl: './fun-facts.component.html',
    styleUrls: ['./fun-facts.component.scss']
})
export class FunFactsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
    @ViewChild(MatSort, { static: true }) sort: MatSort
    public displayedColumns: string[] = ['text', 'options']
    public dataSource: MatTableDataSource<any>
    public funFacts: any = []
    public filter: string

    public pageNumber: number = 0
    public pageLimit: number = 5
    public totalCount: number = 0

    constructor(private funFactService: FunFactService, private dialog: MatDialog) {
        this.dataSource = new MatTableDataSource(this.funFacts)
    }

    async ngOnInit() {
        await this.loadPage()
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
    }

    async loadPage() {
        try {
            const { funFacts, total } = await this.funFactService.getFunFacts({
                searchQuery: this.filter,
                skip: this.pageNumber * this.pageLimit,
                limit: this.pageLimit
            })
            this.funFacts = funFacts
            this.dataSource = new MatTableDataSource(this.funFacts)
            this.totalCount = total
        } catch (err) {
            console.log(err)
        }
    }

    add() {
        const dialogRef = this.dialog.open(AddFunFactComponent, {
            width: '900px'
        })
        dialogRef.afterClosed().subscribe((data) => {
            this.loadPage()
        })
    }

    async delete(funFactId) {
        await this.funFactService.deleteFunFact({ funFactId })
        this.loadPage()
    }

    public async applyFilter(filterValue: string) {
        this.filter = filterValue.trim().toLowerCase()
        this.pageNumber = 0
        await this.loadPage()
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage()
        }
    }

    public changePage($event) {
        this.pageLimit = $event.pageSize
        this.pageNumber = $event.pageIndex
        this.loadPage()
    }
}
