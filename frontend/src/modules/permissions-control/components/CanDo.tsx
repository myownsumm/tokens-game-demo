import { AuthUser } from '../../auth/auth.typings.ts';
import React, { useCallback } from 'react';


export enum CanDoOperations {
  transfer = 'transfer',
  reject = 'reject',
  approve = 'approve'
}


const PERMISSIONS_CONFIG = {
  [CanDoOperations.transfer]: (user: AuthUser, entity: any) => user.id !== entity.id
};


export interface CanDoProps extends React.PropsWithChildren {
  user: AuthUser;
  entity: any; // TODO. add types
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