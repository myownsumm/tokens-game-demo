import React, { useEffect, useState } from 'react';
import { socket } from '../../socket.ts';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Switch } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export function SocketsConnector() {
  const [ isConnected, setIsConnected ] = useState(socket.connected);
  const [ events, setEvents ] = useState([]);

  const [ open, setOpen ] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (clearMessages?: boolean) => {
    setOpen(false);

    if (clearMessages) {
      setEvents([]);
    }
  };

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function onSwitchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.checked ? connect() : disconnect();
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value) {
      // TODO. handle actions here later
      setEvents(previous => [ ...previous, value ]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('events', onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('events', onEvent);
    };
  }, []);

  return (
    <>
      <FormControlLabel control={
        <Switch color={ 'secondary' } defaultChecked onChange={ onSwitchChangeHandler }/>
      } label={ `Real Time: ${ isConnected ? 'Connected' : 'Disconnected' }` }/>

      <IconButton color="inherit" onClick={ handleClickOpen }>
        <Badge badgeContent={ events.length } color="secondary">
          <NotificationsIcon/>
        </Badge>
      </IconButton>

      <Dialog
        open={ open }
        onClose={ () => handleClose() }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { 'Real Time messages list' }
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'} id="alert-dialog-description" minWidth={ '600px' } minHeight={ '200px' }
                             maxHeight={ '200px' }>
            <Stack component="div">
              { events.map(event =>
                <p key={ JSON.stringify(event) }>{ event }</p>
              ) }
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => handleClose() }>Close</Button>
          <Button onClick={ () => handleClose(true) } autoFocus>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}