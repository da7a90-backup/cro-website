import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { SharedService } from '../../services/shared.service'

@Component({
    selector: 'app-legal',
    templateUrl: './legal.component.html',
    styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
    public navLinks: any
    public currentUrl: SafeResourceUrl

    constructor(
        private sharedService: SharedService,
        private sanitizer: DomSanitizer,
        private router: Router
    ) {}

    async ngOnInit() {
        this.sharedService.isLoginPage = false
        this.navLinks = [
            {
                label: 'Privacy Policy',
                path: 'privacy-policy',
                url: 'https://code-crow-legal-docs.s3.amazonaws.com/legal/privacy.pdf'
            },
            {
                label: 'Cookie Policy',
                path: 'cookie-policy',
                url: 'https://code-crow-legal-docs.s3.amazonaws.com/legal/cookie.pdf'
            },
            {
                label: 'Copyright Policy',
                path: 'copyright-policy',
                url: 'https://code-crow-legal-docs.s3.amazonaws.com/legal/copyright.pdf'
            },
            {
                label: 'GDPR Policy',
                path: 'gdpr-policy',
                url: 'https://code-crow-legal-docs.s3.amazonaws.com/legal/gdpr.pdf'
            },
            {
                label: 'Terms of Service',
                path: 'terms-of-service',
                url: 'https://code-crow-legal-docs.s3.amazonaws.com/legal/terms.pdf'
            }
        ]
        this.updatePdf(this.navLinks[0])
    }

    updatePdf(link) {
        this.router.navigate(['/legal', link.path])
        this.currentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link.url)
    }
}
