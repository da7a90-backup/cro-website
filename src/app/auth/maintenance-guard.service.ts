import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { TokenStorage } from './token.storage'
import { AdminService } from '../services/admin.service'
import { AuthService } from './auth.service'
import { RemoteConfigService } from '../services/remoteConfig.service'

@Injectable()
export class MaintenanceGuard implements CanActivate {
    constructor(
        public router: Router,
        public tokenStorage: TokenStorage,
        public adminService: AdminService,
        private authService: AuthService,
        private remoteConfigService: RemoteConfigService
    ) {}

    async canActivate() {
        const isAuthenticated = await this.tokenStorage.getAuthenticatedStatus()
        if (isAuthenticated) {
            try {
                const isMaintenanceModeEnabled = await this.remoteConfigService.getRemoteConfigByKey({ flagKey: 'maintenance-mode' })
                if (isMaintenanceModeEnabled.flagValue) {
                    const user = await this.authService.me()
                    if (user && !user.isAdmin) {
                        this.router.navigate(['/maintenance'])
                        return false
                    } else {
                        return true
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        return true
    }
}