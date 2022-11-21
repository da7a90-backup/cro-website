import { Injectable } from '@angular/core'

const JWT_KEY = 'jwt'

@Injectable({
    providedIn: 'root'
})
export class TokenStorage {
    constructor() {}

    signOut() {
        localStorage.clear()
    }

    public saveJWT(jwt: string) {
        localStorage.setItem(JWT_KEY, jwt)
    }

    public saveUserId(userId: string) {
        localStorage.setItem('userId', userId)
    }

    getAuthenticatedStatus(): boolean {
        if (localStorage.getItem(JWT_KEY)) return true
        else return false
    }
}
