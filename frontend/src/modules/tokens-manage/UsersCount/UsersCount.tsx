import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useAuth } from '../../auth/providers/auth.provider.tsx';
import { USER_IAN_NAME, USER_JOHN_NAME, USER_KATE_NAME, USERS_TO_IDS } from '../../auth/mock.ts';


export function UsersCount() {
  const { userId } = useAuth();

  return (
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
              { userId !== USERS_TO_IDS[USER_JOHN_NAME] && <Button> Transfer</Button> }
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
              { userId !== USERS_TO_IDS[USER_IAN_NAME] && <Button> Transfer</Button> }
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
              { userId !== USERS_TO_IDS[USER_KATE_NAME] && <Button> Transfer</Button> }
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}