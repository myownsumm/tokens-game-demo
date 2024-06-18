import { AuthUser } from '../../auth/auth.typings.ts';
import React, { useCallback } from 'react';
import { TokenTransferStatus } from '../../tokens-management/tokens.typings.ts';


export enum CanDoOperations {
  transfer = 'transfer',
  reject = 'reject',
  approve = 'approve'
}


// TODO. These rules should not be stored right here inside this config.
// In a Real App it could be a fullstack RBAC / ACL solution working together with BE and complex configuration.
const PERMISSIONS_CONFIG = {
  [CanDoOperations.transfer]: (user: AuthUser, entity: any) => user.id !== entity.id,

  [CanDoOperations.reject]: (user: AuthUser, entity: any) => {
    const userIsASender = user.id === entity.senderId;
    const transferIsCompleted = entity.status !== TokenTransferStatus.pending

    return !userIsASender && !transferIsCompleted;
  },

  [CanDoOperations.approve]: (user: AuthUser, entity: any) => {
    const userIsASender = user.id === entity.senderId;
    const userIsARecipient = user.id === entity.recipientId;
    const transferIsCompleted = entity.status !== TokenTransferStatus.pending

    return !userIsASender && !userIsARecipient && !transferIsCompleted;
  }
};


export interface CanDoProps extends React.PropsWithChildren {
  user: AuthUser;
  entity: any; // TODO. add type, or pass a generic
  operation: CanDoOperations;
}


/**
 * That is a mock Component just for Demo purposes to demonstrate how we should handle available UI control elements for Auth Users.
 * TODO. it should interact closely to BE to fetch available operations and their rules.
 */
export function CanDo({ children, entity, operation, user }: CanDoProps) {
  const can = useCallback(() => {
    // @ts-ignore no need to specify types for 100% mocked thing
    return PERMISSIONS_CONFIG[operation](user, entity);
  }, [ entity, operation, user ]);

  return (
    <>
      { can() && children }
    </>
  );
}