import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable, throwError, lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(public http: HttpClient) {}

    async createTransaction(
        url,
        type,
        amount,
        receiverId,
        receiverName,
        senderId,
        senderName,
        channelId
    ): Promise<any> {
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

        return await lastValueFrom(
            this.http.post(`${environment.apiUrl}/transaction/create-transaction`, data)
        )
    }

    async getTransactionsByUserId(userId): Promise<any> {
        return await lastValueFrom(
            this.http.get(
                `${environment.apiUrl}/transactions/get-transactions-by-user-id?id=${userId}`
            )
        )
    }

    async  getTransactionsBySenderName(senderName): Promise<any> {
        return await lastValueFrom(
            this.http.get(
                `${environment.apiUrl}/transactions/get-transactions-by-sender-name?senderName=${senderName}`
            )
        )
    }

    async  getTransactionsByChannelId(channelId): Promise<any> {
        return await lastValueFrom(
            this.http.get(
                `${environment.apiUrl}/transactions/get-transactions-by-channel-id?channelId=${channelId}`
            )
        )
    }
}
