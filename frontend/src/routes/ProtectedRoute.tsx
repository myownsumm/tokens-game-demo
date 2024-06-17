import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../modules/auth/providers/auth.provider.tsx';


export const ProtectedRoute = (props: React.PropsWithChildren) => {
  const { userId } = useAuth();

  // Check if the user is authenticated
  if (!userId) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login"/>;
  }

  // If authenticated, render the child routes
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { props.children }
    </>
  );
};
