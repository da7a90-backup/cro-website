import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { MatRippleModule } from '@angular/material/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'
import { AuthHeaderInterceptor } from './interceptors/header.interceptor'
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'
import { AppRoutingModule } from './app-routing.module'
import { ChannelDetailsComponent } from './pages/channel-details/channel-details.component'
import { ContentComponent } from './pages/channel-details/content/content.component'
import { ChatComponent } from './pages/channel-details/chat/chat.component'
import { FilterPipe } from './filter.pipe'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { VideoComponent } from './pages/channel-details/content/video/video.component'
import { ChannelSettingsComponent } from './pages/channel-details/channel/channel-settings/channel-settings.component'
import { LegalModule } from './pages/legal/legal.module'
import { DialogComponent } from './controls/dialog/dialog.component'
import { DialogService } from './services/dialog.service'
import { ThemeService } from './services/theme.service'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FriendChatComponent } from './pages/friends/friend-chat/friend-chat.component'
import { SideBarComponent } from './side-bar/side-bar.component'
import { FeatureFlagDirective } from './directives/feature-flag.directive'
import { OverlayModule } from '@angular/cdk/overlay'
import { SideNavComponent } from './pages/settings/side-nav/side-nav.component'
import { FriendsMenuSixComponent } from './pages/friends/friends-menus/friends-menus.component'
import { StreamControlsComponent } from './pages/channel-details/content/stream-controls/stream-controls.component'
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { CreateGroupComponent } from './pages/friends/create-group/create-group.component'
import { LoadingDialogComponent } from './controls/loading-dialog/loading-dialog.component'
import { WaitingRoomDialogComponent } from './pages/channel-details/channel/waiting-room-dialog/waiting-room-dialog.component'
import { ViewChannelDetailComponent } from './pages/channel-details/chat/view-channel-detail/view-channel-detail.component'
import { AttachmentComponent } from './pages/channel-details/chat/view-channel-detail/attachment/attachment.component'
import { MatChipsModule } from '@angular/material/chips'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { EditGroupComponent } from './pages/friends/edit-group/edit-group.component'
import { LottieModule } from 'ngx-lottie'
import player from 'lottie-web'
import { TokenStorage } from './auth/token.storage'
import { MatIconModule } from '@angular/material/icon'
import { BnNgIdleService } from 'bn-ng-idle'
import { ProfileComponent } from './pages/profile/profile.component'
import { LoginGuard } from './auth/login-guard.service'
import { MaintenanceGuard } from './auth/maintenance-guard.service'
import { AuthGuard } from './auth/auth-guard.service'
import { FollowItemComponent } from './pages/profile/follow-panel/follow-item/follow-item.component'
import { FollowPanelComponent } from './pages/profile/follow-panel/follow-panel.component'
import { TechStackDropdownComponent } from './controls/tech-stack-dropdown/tech-stack-dropdown.component'
import { HomeModule } from './pages/home/home.module'
import { InAppSnackBarComponent } from './controls/in-app-snack-bar/in-app-snack-bar.component'
import { FriendsDialogComponent } from './pages/friends/friends-dialog/friends-dialog.component'
import { FriendItemComponent } from './pages/friends/friend-item/friend-item.component'
import { FriendsComponent } from './pages/friends/friends.component'
import { CommunityDialogComponent } from './pages/community-dialog/community-dialog.component'
import { CommunityComponent } from './pages/community-dialog/community/community.component'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireRemoteConfigModule, SETTINGS } from '@angular/fire/compat/remote-config'
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';

export function playerFactory() {
    return player
}

@NgModule({
    declarations: [
        AppComponent,
        ChannelDetailsComponent,
        ContentComponent,
        ChatComponent,
        FilterPipe,
        ChannelSettingsComponent,
        VideoComponent,
        DialogComponent,
        FriendsComponent,
        FriendItemComponent,
        FriendChatComponent,
        SideBarComponent,
        FeatureFlagDirective,
        SideNavComponent,
        FriendsMenuSixComponent,
        StreamControlsComponent,
        CreateGroupComponent,
        LoadingDialogComponent,
        WaitingRoomDialogComponent,
        ViewChannelDetailComponent,
        AttachmentComponent,
        EditGroupComponent,
        FriendsDialogComponent,
        ProfileComponent,
        FollowItemComponent,
        FollowPanelComponent,
        TechStackDropdownComponent,
        InAppSnackBarComponent,
        CommunityDialogComponent,
        CommunityComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PickerModule,
        CommonModule,
        HttpClientModule,
        SharedModule,
        LegalModule,
        RouterModule,
        AppRoutingModule,
        MatChipsModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        OverlayModule,
        MatDialogModule,
        LottieModule.forRoot({ player: playerFactory }),
        HomeModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireRemoteConfigModule,
        AngularFireAnalyticsModule
    ],
    exports: [
        CreateGroupComponent,
        EditGroupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BnNgIdleService,
        ThemeService,
        TokenStorage,
        AuthGuard,
        MaintenanceGuard,
        LoginGuard,
        DialogService,
        {
            provide: [HTTP_INTERCEPTORS],
            useClass: AuthHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CredentialsInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CatchErrorInterceptor,
            multi: true
        },
        UserTrackingService,
        ScreenTrackingService,
        {
            provide: SETTINGS,
            useFactory: () => isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {}
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
