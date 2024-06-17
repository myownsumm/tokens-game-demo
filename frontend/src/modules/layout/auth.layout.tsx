import React from 'react';


const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">Auth Layout</div>
        <div className="col-6">second col</div>
      </div>
      { children }
    </div>
  );
};

export default AuthLayout;
