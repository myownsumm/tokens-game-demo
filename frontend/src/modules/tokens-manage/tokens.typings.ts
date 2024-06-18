export enum TokenTransferStatus {
  pending = 'pending',
  approved = 'approved',
  completed = 'completed',
}


export type UserTokensAvailable = { userId: string, tokens: number };
export type TokenTransfer = { senderId: string, recipientId: string, status: TokenTransferStatus, amount: number };


