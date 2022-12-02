import { Injectable, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'
import { AnimationItem } from 'lottie-web'
import { AnimationOptions } from 'ngx-lottie'

import { StyleManagerService } from '../style-manager.service'
import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'
import { SharedService } from './shared.service'

@Injectable({ providedIn: 'root' })
export class ThemeService {
    public logoAnimationOpts: BehaviorSubject<AnimationOptions> = new BehaviorSubject(null)
    private animationItem: AnimationItem
    public isDarkTheme: boolean = true

    constructor(
        private http: HttpClient,
        private styleManager: StyleManagerService,
        public authService: AuthService,
        public userService: UserService,
        private router: Router,
        private ngZone: NgZone,
        private sharedService: SharedService
    ) {}

    async setTheme(themeToSet) {
        if (this.authService.currentUser) await this.userService.updateUser({ theme: themeToSet })
        this.styleManager.setStyle('theme', `assets/styles/${themeToSet}.css`)
        this.updateAnimation()
        this.isDarkTheme = themeToSet === 'theme-dark'
    }

    playLottieAnimation() {
        this.sharedService.wasHomePressed = true
        this.navigate('/')
        this.ngZone.runOutsideAngular(() => {
            this.animationItem.stop()
            this.animationItem.play()
        })
    }

    async navigate(link) {
        try {
            if (this.authService.currentUser) {
                const isBanned = this.authService.currentUser
                    ? this.authService.currentUser.isBanned
                    : false
                if (isBanned) {
                    await this.authService.logout()
                } else {
                    this.router.navigate([link])
                }
            } else {
                await this.authService.logout()
            }
        } catch (err) {
            await this.authService.logout()
        }
    }

    animationCreated(animationItem: AnimationItem) {
        this.animationItem = animationItem
    }

    async updateAnimationOpts() {
        this.logoAnimationOpts.next({
            path: (this.isDarkTheme)
                ? '/assets/lottie/logo_1_dark.json'
                : '/assets/lottie/logo_1_light.json',
            loop: false
        })
    }

    async updateAnimation() {
        await this.updateAnimationOpts()
        this.ngZone.runOutsideAngular(() => {
            this.animationItem?.stop()
            this.animationItem?.play()
        })
    }
}
