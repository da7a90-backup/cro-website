import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class RemoteConfigService {
    public isMaintenanceModeEnabled: boolean = false
    public isFeatureVideoResponsesEnabled: boolean = false
    public isFeatureGroupChatEnabled: boolean = false
    public isFeatureMintPageEnabled: boolean = false
    public isFeaturePremiumPageEnabled: boolean = false

    constructor(
        public http: HttpClient
    ) {}

    async createRemoteConfig({ flagKey, flagValue }): Promise<any> {
        return await lastValueFrom(this.http.put(`${environment.apiUrl}/remote-config`, { flagKey, flagValue }))
    }

    async getRemoteConfigs() {
        const remoteCongigs: any = await lastValueFrom(this.http.get(`${environment.apiUrl}/remote-configs`))
        remoteCongigs.map(config => {
            console.log("config", config)
            this.isMaintenanceModeEnabled = config.flagKey === 'maintenance-mode' ? config.flagValue : false
            this.isFeatureVideoResponsesEnabled = config.flagKey === 'feature-video-responses' ? config.flagValue : false
            this.isFeatureGroupChatEnabled = config.flagKey === 'feature-group-chat' ? config.flagValue : false
            this.isFeatureMintPageEnabled = config.flagKey === 'feature-mint-page' ? config.flagValue : false
            this.isFeaturePremiumPageEnabled = config.flagKey === 'feature-premium-page' ? config.flagValue : false
        })
    }

    async getRemoteConfigByKey({ flagKey }): Promise<any> {
        return await lastValueFrom(this.http.get(`${environment.apiUrl}/remote-config?flagKey=${flagKey}`))
    }
}