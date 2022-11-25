import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class FunFactService {
    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    async createFunFact({ funFactText }): Promise<any> {
        return await lastValueFrom(this.http.put(`${environment.apiUrl}/fun-facts`, { funFactText }))
    }

    async deleteFunFact({ funFactId }): Promise<any> {
        return await lastValueFrom(this.http
            .delete(`${environment.apiUrl}/fun-facts?funFactId=${funFactId}`, {}))
    }

    async getRandomFunFact(): Promise<any> {
        return await lastValueFrom(this.http.get(`${environment.apiUrl}/fun-facts/random`, {}))
    }

    async getFunFacts({ searchQuery, skip, limit }) {
        const funFactsWithCount = await lastValueFrom(this.http
            .get(`${environment.apiUrl}/fun-facts`, {
                params: { searchQuery, skip, limit }
            }))
        if (!funFactsWithCount || !funFactsWithCount['total']) {
            if (searchQuery) {
                this.snackBar.open('No results with the search criteria', null, {
                    duration: 2000
                })
            }
        }
        return {
            funFacts: funFactsWithCount['funFacts'],
            total: funFactsWithCount['total']
        }
    }
}
