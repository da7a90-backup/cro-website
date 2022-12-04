import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    constructor(
        public http: HttpClient
    ) {}

    /**
     * @param source1 person you want to follow
     * @param source2 your user id
     */
    async createFollow({ source1, source2 }): Promise<any> {
        return await lastValueFrom(this.http.put(`${environment.apiUrl}/follow`, { source1, source2 }))
    }

    async getFollows({ source, sourceType, searchQuery, skip, limit }): Promise<any> {
        return await lastValueFrom(this.http
            .get(`${environment.apiUrl}/follow`, {
                params: { source, sourceType, searchQuery, skip, limit }
            }))
    }

    async getFollowCount({ source, sourceType }): Promise<any> {
        return await lastValueFrom(this.http
            .get(`${environment.apiUrl}/follow/count`, {
                params: { source, sourceType }
            }))
    }

    async deleteFollow({ source1, source2 }): Promise<any> {
        return await lastValueFrom(this.http
            .delete(`${environment.apiUrl}/follow`, { params: { source1, source2 } }))
    }

    async getFollowRelationship({ source }): Promise<any> {
        return await lastValueFrom(this.http
            .get(`${environment.apiUrl}/follow/relationship`, { params: { source } }))
    }
}
