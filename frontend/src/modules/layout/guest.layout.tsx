import React from 'react';
import { Container, Grid } from '@mui/material';


const GuestLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Grid container justifyContent="center">
      <Container fixed>
        { children }
      </Container>
    </Grid>
  );
};

export default GuestLayout;
