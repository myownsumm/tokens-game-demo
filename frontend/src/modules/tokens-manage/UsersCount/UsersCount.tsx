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


export function UsersCount() {
  const { authUser } = useAuth();

  const [ open, setOpen ] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <List sx={ { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }>
        { AUTH_USERS.map((user) => (
          <div key={user.id}>
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
                      10 tokens
                    </Typography>
                    <CanDo operation={ CanDoOperations.transfer }
                           user={ authUser! }
                           entity={ user }>
                      <Button onClick={ handleOpen }>Transfer</Button>
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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={ { mt: 2 } }>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}