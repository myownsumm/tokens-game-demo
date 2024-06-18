import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Stack } from '@mui/material';
import CloseButton from '@mui/icons-material/Close';
import CheckButton from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotifications } from '@u-cat/u-notifications';
import { TokenTransfer } from '../tokens.typings.ts';
import { getUserById } from '../../auth/auth.mock.ts';


export function TransferRequests() {
  const [ tokenTransfers, setTokenTransfers ] = useState<TokenTransfer[]>([]);
  const { danger } = useNotifications();

  useEffect(() => {
    axios.request({ method: 'GET', url: 'http://localhost:3000/tokens-transfers' })
      .then(
        response => {
          setTokenTransfers(response.data);
        }
      )
      .catch(() => {
        danger('Problem occurred while trying to fetch Token transfers list.');
      })
  }, []);

  return (
    <React.Fragment>
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
            <TableRow key={ JSON.stringify(row) }>
              <TableCell>{ getUserById(row.senderId)?.email }</TableCell>
              <TableCell>{ getUserById(row.recipientId)?.email }</TableCell>
              <TableCell align="right">{ row.amount }</TableCell>
              <TableCell>
                <Chip size="small" label={ row.status } color="warning"/>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={ 0 }>
                  <IconButton size="small" aria-label="reject">
                    <CloseButton fontSize="inherit" color="error"/>
                  </IconButton>
                  <IconButton size="small" aria-label="approve">
                    <CheckButton fontSize="inherit" color="success"/>
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}