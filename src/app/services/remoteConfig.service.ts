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
        const remoteConfigs: any = await lastValueFrom(this.http.get(`${environment.apiUrl}/remote-configs`))
        remoteConfigs.map(config => {
            if (config.flagKey === 'maintenance-mode') this.isMaintenanceModeEnabled = config.flagValue
            if (config.flagKey === 'feature-video-responses') this.isFeatureVideoResponsesEnabled = config.flagValue
            if (config.flagKey === 'feature-group-chat') this.isFeatureGroupChatEnabled = config.flagValue
            if (config.flagKey === 'feature-mint-page') this.isFeatureMintPageEnabled = config.flagValue
            if (config.flagKey === 'feature-premium-page') this.isFeaturePremiumPageEnabled = config.flagValue
        })
        console.log('remoteConfigs', remoteConfigs)
    }

    async getRemoteConfigByKey({ flagKey }): Promise<any> {
        return await lastValueFrom(this.http.get(`${environment.apiUrl}/remote-config?flagKey=${flagKey}`))
    }
}