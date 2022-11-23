import { Injectable } from '@angular/core'
import { AngularFireRemoteConfig, mapToObject } from '@angular/fire/compat/remote-config'
import { AngularFireAnalytics } from '@angular/fire/compat/analytics'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    public isMaintenanceModeEnabled: any = false
    public isFeatureVideoResponsesEnabled: any = false
    public isFeatureGroupChatEnabled: any = false
    public isFeatureMintPageEnabled: any = false
    public isFeaturePremiumPageEnabled: any = false

    constructor(
        private remoteConfig: AngularFireRemoteConfig,
        private analytics: AngularFireAnalytics
    ) {}

    public setUserPropertyAnalytics() {
        const env = environment.name === 'local' || 'development' ? 'dev' : 'prod'
        this.analytics.setUserProperties({ server_env: env })
    }

    public async getAllRemoteConfigValues() {
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