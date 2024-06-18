import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Modal } from '@mui/material';
import { useAuth } from '../../auth/providers/auth.provider.tsx';
import Box from '@mui/material/Box';
import { CanDo, CanDoOperations } from '../../permissions-control/components/CanDo.tsx';
import { AUTH_USERS } from '../../auth/auth.mock.ts';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNotifications } from '@u-cat/u-notifications/dist/providers/u-notifications.provider';
import { UserTokensAvailable } from '../tokens.typings.ts';
import { CreateTransferRequest } from '../CreateTransferRequest/CreateTransferRequest.tsx';


export function UsersCount() {
  const { authUser } = useAuth();
  const { danger } = useNotifications();

  const [ open, setOpen ] = useState(false);
  const [ senderId, setSenderId ] = useState('');

  const handleOpen = (senderId: string) => {
    setSenderId(senderId);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const [ tokensAvailable, setTokensAvailable ] = useState<UserTokensAvailable[]>([]);

  useEffect(() => {
    axios.request({ method: 'GET', url: 'http://localhost:3000/users-tokens' })
      .then(
        response => {
          setTokensAvailable(response.data);
        }
      )
      .catch(() => {
        danger('Problem occurred while trying to fetch Tokens available list.');
      })
  }, [ authUser ]);


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const getTokensAvailable = useCallback((userId: string) => {
    return tokensAvailable.find(i => i.id === userId)?.tokens;
  }, [ tokensAvailable ]);

  return (
    <>
      <List sx={ { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }>
        { AUTH_USERS.map((user) => (
          <div key={ user.id }>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={ user.email } src={ user.avatar }/>
              </ListItemAvatar>
              <ListItemText
                primary={ user.email }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={ { display: 'inline' } }
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      { `${ getTokensAvailable(user.id) } tokens` }
                    </Typography>
                    <CanDo operation={ CanDoOperations.transfer }
                           user={ authUser! }
                           entity={ user }>
                      <Button onClick={ () => handleOpen(user.id) }>Transfer</Button>
                    </CanDo>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li"/>
          </div>
        )) }
      </List>

      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Request a transfer
          </Typography>
          <CreateTransferRequest senderId={senderId} handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}