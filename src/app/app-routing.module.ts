import { CareersModule } from './pages/careers/careers.module'
import { ProfileComponent } from './pages/profile/profile.component'
import { MaintenanceGuard } from './auth/maintenance-guard.service'
import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth-guard.service'
import { ChannelDetailsComponent } from './pages/channel-details/channel-details.component'
import { LoginGuard } from './auth/login-guard.service'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
        canActivate: [MaintenanceGuard]
    },
    // ! Incomplete
    {
        path: 'channel/:channelId',
        component: ChannelDetailsComponent,
        canActivate: [AuthGuard, MaintenanceGuard]
    },
    {
        path: 'authenticate',
        loadChildren: () =>
            import('./auth/authenticate/authenticate.module').then((m) => m.AuthenticateModule),
        canActivate: [LoginGuard]
    },
    {
        path: '404',
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
    },
    {
        path: 'maintenance',
        loadChildren: () =>
            import('./pages/maintenance/maintenance.module').then((m) => m.MaintenanceModule)
    },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    // },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
    },
    // {
    //   path: 'creator-space',
    //   loadChildren: () => import('../pages/creator-space/creator-space.module').then(m => m.CreatorSpaceModule),
    //   canActivate: [AuthGuard, MaintenanceGuard]
    // },
    {
        path: 'legal',
        loadChildren: () => import('./pages/legal/legal.module').then((m) => m.LegalModule)
    },
    // {
    //   path: 'pricing',
    //   component: PricingComponent,
    //   canActivate: [MaintenanceGuard]
    // },
    // {
    //   path: 'videos',
    //   component: VideosComponent,
    //   canActivate: [AuthGuard, MaintenanceGuard]
    // },
    // ! No need for that already using lazy loading
    // {
    //     path: 'legal',
    //     component: LegalComponent
    // },
    {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule)
    },
    // {
    //     path: 'partners',
    //     component: PaymentMethodsComponent,
    //     canActivate: [AuthGuard, MaintenanceGuard]
    // },
    {
        path: 'settings',
        loadChildren: () =>
            import('./pages/settings/user-settings/user-settings.module').then(
                (m) => m.UserSettingsModule
            ),
        canActivate: [AuthGuard, MaintenanceGuard]
    },
    {
        path: 'premium',
        loadChildren: () => import('./pages/premium/premium.module').then((m) => m.PremiumModule),
        canActivate: [AuthGuard, MaintenanceGuard]
    },
    {
        path: 'careers',
        loadChildren: () => import('./pages/careers/careers.module').then((m) => m.CareersModule),
    },
    {
        path: 'profile/:customUsername',
        component: ProfileComponent,
        canActivate: [AuthGuard, MaintenanceGuard]
    },
    // {
    //   path: 'checkout/:priceId',
    //   component: CheckoutComponent
    // },
    // {
    //   path: 'purchase/:skuId',
    //   component: PurchaseComponent
    // },
    // {
    //     path: 'video/:id',
    //     component: VideoPlayerComponent,
    //     canActivate: [AuthGuard, MaintenanceGuard]
    // },
    {
        path: '**',
        redirectTo: '404'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule],
    providers: [],
    declarations: []
})
export class AppRoutingModule {}
