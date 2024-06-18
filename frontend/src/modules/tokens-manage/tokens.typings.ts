export enum TokenTransferStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'completed',
}


export const TRANSFER_REQUEST_STATUS_TO_COLOR = {
  [TokenTransferStatus.pending]: 'warning',
  [TokenTransferStatus.approved]: 'success',
  [TokenTransferStatus.rejected]: 'error'
}


export type UserTokensAvailable = { id: string, tokens: number };
export type TokenTransfer = {
  id: string;
  senderId: string,
  recipientId: string,
  status: TokenTransferStatus,
  amount: number
};


