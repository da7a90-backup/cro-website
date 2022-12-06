import { Injectable } from '@angular/core'
import { AngularFireRemoteConfig, mapToObject } from '@angular/fire/compat/remote-config'
import { AngularFireAnalytics } from '@angular/fire/compat/analytics'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    public isMaintenanceModeEnabled: boolean = false
    public isFeatureVideoResponsesEnabled: boolean = false
    public isFeatureGroupChatEnabled: boolean = false
    public isFeatureMintPageEnabled: boolean = false
    public isFeaturePremiumPageEnabled: boolean = false

    constructor(
        private remoteConfig: AngularFireRemoteConfig,
        private analytics: AngularFireAnalytics
    ) {}

    public setUserPropertyAnalytics() {
        const env = environment.name === 'local' || 'development' ? 'dev' : 'prod'
        this.analytics.setUserProperties({ server_env: env })
    }

    public async getAllRemoteConfigValues() {
        (await this.remoteConfig.settings).minimumFetchIntervalMillis = environment.production ? 21600000 : 360000
        this.remoteConfig.fetchAndActivate().then(() => {
            this.remoteConfig.getAll().then((changes) => {
                this.isMaintenanceModeEnabled = changes.site_settings_maintenance_mode.asBoolean()
                this.isFeatureVideoResponsesEnabled = changes.feature_video_responses.asBoolean()
                this.isFeatureGroupChatEnabled = changes.feature_group_chat.asBoolean()
                this.isFeatureMintPageEnabled = changes.feature_mint_page.asBoolean()
                this.isFeaturePremiumPageEnabled = changes.feature_premium_page.asBoolean()
            })
        })
    }
}