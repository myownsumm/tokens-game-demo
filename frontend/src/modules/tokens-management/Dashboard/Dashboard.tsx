import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TransferRequestsList } from '../TransferRequestsList/TransferRequestsList.tsx';
import { UsersTokens } from '../UsersTokens/UsersTokens.tsx';


export function Dashboard() {
  return (
    <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } md={ 7 } lg={ 8 }>
          <Paper
            sx={ {
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
              minHeight: '70vh'
            } }
          >
            <TransferRequestsList/>
          </Paper>
        </Grid>
        <Grid item xs={ 12 } md={ 5 } lg={ 4 }>
          <Paper
            sx={ {
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
              minHeight: '70vh'
            } }
          >
            <UsersTokens/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}