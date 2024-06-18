import { AuthUser } from '../../auth/auth.typings.ts';
import React, { useCallback } from 'react';


export enum CanDoOperations {
  transfer
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
    return PERMISSIONS_CONFIG[operation](user, entity);
  }, [ entity, operation, user ]);

  return (
    <>
      { can() && children }
    </>
  );
}