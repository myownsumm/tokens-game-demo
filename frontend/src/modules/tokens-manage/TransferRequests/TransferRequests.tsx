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

// Generate Order Data
function createData(
  id: number,
  sender: string,
  recipient: string,
  amount: number
) {
  return { id, sender, recipient, amount };
}

const rows = [
  createData(
    0,
    'Elvis Presley',
    'Tupelo, MS',
    312.44
  ),
  createData(
    1,
    'Paul McCartney',
    'London, UK',
    866.99
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    100.81
  ),
  createData(
    3,
    'Michael Jackson',
    'Gary, IN',
    654.39
  ),
  createData(
    4,
    'Bruce Springsteen',
    'Long Branch, NJ',
    212.79
  )
];

export function TransferRequests() {
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
          { rows.map((row) => (
            <TableRow key={ row.id }>
              <TableCell>{ row.sender }</TableCell>
              <TableCell>{ row.recipient }</TableCell>
              <TableCell align="right">{ `$${ row.amount }` }</TableCell>
              <TableCell>
                <Chip size="small" label="pending" color="warning"/>
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