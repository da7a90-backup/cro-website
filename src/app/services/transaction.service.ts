import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, throwError } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(public http: HttpClient) {}

    createTransaction(
        url,
        type,
        amount,
        receiverId,
        receiverName,
        senderId,
        senderName,
        channelId
    ): Observable<any> {
        url = `https://explorer.solana.com/tx/${url}?cluster=devnet`
        const data = {
            channelId: channelId,
            url: url,
            date: new Date().toLocaleDateString(),
            receiverId: receiverId,
            receiverName: receiverName,
            senderId: senderId,
            senderName: senderName,
            amount: amount,
            type: type
        }

        return this.http.post(`${environment.apiUrl}/transaction/create-transaction`, data)
    }

    getTransactionsByUserId(userId) {
        return this.http.get(
            `${environment.apiUrl}/transactions/get-transactions-by-user-id?id=${userId}`
        )
    }

    getTransactionsBySenderName(senderName) {
        return this.http.get(
            `${environment.apiUrl}/transactions/get-transactions-by-sender-name?senderName=${senderName}`
        )
    }

    getTransactionsByChannelId(channelId) {
        return this.http.get(
            `${environment.apiUrl}/transactions/get-transactions-by-channel-id?channelId=${channelId}`
        )
    }
}
