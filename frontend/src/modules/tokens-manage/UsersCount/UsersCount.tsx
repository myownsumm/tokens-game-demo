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
import { USER_IAN_NAME, USER_JOHN_NAME, USER_KATE_NAME, USERS_TO_IDS } from '../../auth/mock.ts';
import Box from '@mui/material/Box';


export function UsersCount() {
  const { userId } = useAuth();

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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/avatars/1.jpg"/>
          </ListItemAvatar>
          <ListItemText
            primary={ USER_JOHN_NAME }
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
                { userId !== USERS_TO_IDS[USER_JOHN_NAME] && <Button onClick={ handleOpen }>Transfer</Button> }
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/avatars/2.jpg"/>
          </ListItemAvatar>
          <ListItemText
            primary={ USER_IAN_NAME }
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
                { userId !== USERS_TO_IDS[USER_IAN_NAME] && <Button onClick={ handleOpen }>Transfer</Button> }
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/avatars/3.jpg"/>
          </ListItemAvatar>
          <ListItemText
            primary={ USER_KATE_NAME }
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
                { userId !== USERS_TO_IDS[USER_KATE_NAME] && <Button onClick={ handleOpen }>Transfer</Button> }
              </React.Fragment>
            }
          />
        </ListItem>
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