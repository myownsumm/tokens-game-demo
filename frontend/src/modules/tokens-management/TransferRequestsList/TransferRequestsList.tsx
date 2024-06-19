import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import CloseButton from '@mui/icons-material/Close';
import CheckButton from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNotifications } from '@u-cat/u-notifications';
import { TokenTransfer, TRANSFER_REQUEST_STATUS_TO_COLOR } from '../tokens.typings.ts';
import { getUserById } from '../../auth/auth.mock.ts';
import Button from '@mui/material/Button';
import { CanDo, CanDoOperations } from '../../permissions-control/components/CanDo.tsx';
import { useAuth } from '../../auth/providers/auth.provider.tsx';
import { useMessages } from '../../messages/providers/messages.provider.tsx';


export function TransferRequestsList() {
  const { authUser } = useAuth();
  const [ tokenTransfers, setTokenTransfers ] = useState<TokenTransfer[]>([]);
  const { danger } = useNotifications();

  const [ open, setOpen ] = useState(false);
  const [ operation, setOperation ] = useState<CanDoOperations>();
  const [ entityId, setEntityId ] = useState<string>();

  const { messages } = useMessages();

  const handleClickOpen = (operation: CanDoOperations, id: string) => {
    setOpen(true);
    setOperation(operation);
    setEntityId(id);
  };

  const handleClose = (result?: boolean) => {
    setOpen(false);

    if (result) {
      axios.request({ method: 'PUT', url: `http://localhost:3000/tokens-transfers/${ entityId }/${ operation }` })
        .then(
          () => {
            fetchTransferRequestsList();
          }
        )
        .catch((err) => {
          danger(`Problem occurred while trying to ${ operation } Token transfer: ${ err.response?.data?.message }`);
        });
    }
  };

  function fetchTransferRequestsList() {
    axios.request({ method: 'GET', url: 'http://localhost:3000/tokens-transfers' })
      .then(
        response => {
          setTokenTransfers(response.data);
        }
      )
      .catch(() => {
        danger('Problem occurred while trying to fetch Token transfers list.');
      })
  }

  // Listening to messages to demonstrate Real Time update possibilities.
  useEffect(() => fetchTransferRequestsList(), [ messages ]);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tokenTransfers.map((row) => (
            <TableRow key={ row.id }>
              <TableCell>{ getUserById(row.senderId)?.email }</TableCell>
              <TableCell>{ getUserById(row.recipientId)?.email }</TableCell>
              <TableCell align="right">{ row.amount }</TableCell>
              <TableCell>
                <Chip size="small" label={ row.status }
                      color={ TRANSFER_REQUEST_STATUS_TO_COLOR[row.status] }/>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={ 0 }>

                  <CanDo operation={ CanDoOperations.reject }
                         user={ authUser! }
                         entity={ row }>
                    <IconButton size="small" aria-label="reject"
                                onClick={ () => handleClickOpen(CanDoOperations.reject, row.id) }>
                      <CloseButton fontSize="inherit" color="error"/>
                    </IconButton>
                  </CanDo>

                  <CanDo operation={ CanDoOperations.approve }
                         user={ authUser! }
                         entity={ row }>
                    <IconButton size="small" aria-label="approve"
                                onClick={ () => handleClickOpen(CanDoOperations.approve, row.id) }>
                      <CheckButton fontSize="inherit" color="success"/>
                    </IconButton>
                  </CanDo>
                </Stack>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>

      <Dialog
        open={ open }
        onClose={ () => handleClose() }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Do you really want to ${ operation } this transfer request?` }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation can not be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => handleClose() }>Cancel</Button>
          <Button onClick={ () => handleClose(true) } autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}