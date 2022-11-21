import { AuthService } from './../../../../../auth/auth.service';
import { ChannelService } from '../../../../../services/channel.service'
import { UserService } from '../../../../../services/user.service'
import { Component } from '@angular/core'
import { environment } from '../../../../../../environments/environment'
import { TransactionService } from '../../../../../services/transaction.service'
import { MatDialogRef } from '@angular/material/dialog'
import { StreamingService } from '../../../../../services/streaming.service'
import * as spl_token from '@solana/spl-token'
import {
    Transaction,
    PublicKey,
    Connection,
    LAMPORTS_PER_SOL,
    TransactionInstruction
} from '@solana/web3.js'
import { DialogData } from '../../../../../shared/dialog-data'
import { DialogService } from '../../../../../services/dialog.service'

// const TOKEN_PROGRAM_ID = 'AvcjewwNBCZixHS8U222K5nt3pdpjKiichoy7j1sGxAM'
const TOKEN_PROGRAM_ID = 'GA4emuG1Ao2iJt2QbZiGL6B3pBPEU7XoVMrhfwYnKM4W'

@Component({
    selector: 'app-stream-controls',
    templateUrl: './stream-token-controls.component.html',
    styleUrls: ['./stream-token-controls.component.scss']
})
export class TokenControlsComponent {
    constructor(
        private dialogRef: MatDialogRef<TokenControlsComponent>,
        public channelService: ChannelService,
        public streamingService: StreamingService,
        public userService: UserService,
        public authService: AuthService,
        public dialogService: DialogService,
        private transactionService: TransactionService,
    ) {
        

    }

    async ngOnDestroy() {
        this.dialogRef.close()
    }

    incrementAmount(prop) {
        let component: any = document.getElementById('amount')
        component.value = parseInt(component.value) + parseInt(prop)
    }

    async transferTokens() {
        try {
            const channelId=this.channelService.currentChannel._id
            const senderId=this.authService.currentUser._id
            const senderName=this.authService.currentUser.displayName
            let amount: any = document.getElementById('amount')
            const userId=this.channelService.currentChannel.user
            const receiverUserName=this.channelService.currentChannel.createdBy
            var destination: any
            const secondDestination = environment.serviceFeeWallet
            amount = parseInt(amount?.value)
            const wallet: any = window
            const provider: any = await wallet?.solana
            await provider.connect()
            const pubKey = provider.publicKey.toString()
            const network = 'https://api.devnet.solana.com'
            const connection = new Connection(network)
            console.log('secondDestination ', secondDestination)
            await this.userService
                .getUserById(userId)
                .then((res) => {
                    // console.log(this.channelService.currentChannel.user,"user ",res)
                    // destination = res?.walletAddress
                    destination = "EH452r2neFEJS4yCNKBSGZjL3LDq6zy67AEUqcWQuBHZ"
                    console.log('destination', destination)
                })
            const mintPublicKey = new PublicKey(TOKEN_PROGRAM_ID)
            
            const fromTokenAccount = await spl_token.getOrCreateAssociatedTokenAccount(
                connection,
                provider,
                mintPublicKey,
                provider.publicKey
            )

            const destPublicKey = new PublicKey(destination)
            const secondDestPublicKey = new PublicKey(secondDestination) //  Destination wallet address

            const associatedDestinationTokenAddr = await spl_token.getAssociatedTokenAddress(
                mintPublicKey,
                destPublicKey
            )

            const secondAssociatedDestinationTokenAddr =
                await spl_token.getAssociatedTokenAddress(
                    mintPublicKey,
                    secondDestPublicKey
                )

            const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr)
            const secondReceiverAccount = await connection.getAccountInfo(
                secondAssociatedDestinationTokenAddr
            )

            const instructions: TransactionInstruction[] = []

            if (receiverAccount === null) {
                instructions.push(
                    spl_token.createAssociatedTokenAccountInstruction(
                        provider.publicKey,
                        associatedDestinationTokenAddr,
                        destPublicKey,
                        mintPublicKey,
                    )
                )
            }

            if (secondReceiverAccount === null) {
                instructions.push(
                    spl_token.createAssociatedTokenAccountInstruction(
                        provider.publicKey,
                        secondAssociatedDestinationTokenAddr,
                        secondDestPublicKey,
                        mintPublicKey,
                    )
                )
            }

            instructions.push(
                spl_token.createTransferInstruction(
                    fromTokenAccount.address,
                    secondAssociatedDestinationTokenAddr,
                    provider.publicKey,
                    amount * 0.05 * LAMPORTS_PER_SOL,
                    [],
                )
            )
            instructions.push(
                spl_token.createTransferInstruction(
                    fromTokenAccount.address,
                    associatedDestinationTokenAddr,
                    provider.publicKey,
                    amount * 0.95 * LAMPORTS_PER_SOL,
                    [],
                )
            )

            const transaction = new Transaction().add(...instructions)

            transaction.feePayer = await provider.publicKey

            let blockhashObj = await connection.getLatestBlockhash()

            transaction.recentBlockhash = await blockhashObj.blockhash

            let signature = await provider.signAndSendTransaction(transaction)

            console.log('signed ', signature)
           
    this.transactionService.createTransaction(signature?.signature,"tip",amount,userId,receiverUserName,senderId,senderName,channelId).subscribe();
            const dialogData: DialogData = {
                title: 'Notice',
                message: 'Transaction Signature : ' + signature?.signature,
                okText: 'OK'
            }
            this.dialogService.openDialog(dialogData)
        } catch (err) {
            // alert(err?.message)
            const dialogData: DialogData = {
                title: 'Notice',
                message: err?.message,
                okText: 'OK'
            }
            this.dialogService.openDialog(dialogData)
        }
    }
}
