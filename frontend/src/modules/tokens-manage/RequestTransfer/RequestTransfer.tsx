import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { AUTH_USERS } from '../../auth/auth.mock.ts';
import axios from 'axios';
import { useNotifications } from '@u-cat/u-notifications';


export interface RequestTransferProps {
  senderId: string;
  handleClose: () => void
}


export function RequestTransfer({ senderId, handleClose }: RequestTransferProps) {
  const { danger } = useNotifications();
  const validationSchema = Yup.object().shape({
    senderId: Yup.string().required('Sender is required'),
    recipientId: Yup.string().required('Recipient is required'),
    amount: Yup.number().positive('Specify positive amount').required('Amount is required')
  });

  return (
    <Formik
      initialValues={ {
        senderId,
        recipientId: '',
        amount: 0
      } }
      validationSchema={ validationSchema }
      onSubmit={ values => {
        axios.request({ method: 'POST', url: 'http://localhost:3000/tokens-transfers', data: values })
          .then(
            () => {
              handleClose();
            }
          )
          .catch(() => {
            danger('Problem occurred while trying to create new Transfer Request.');
          })
      } }
    >
      { ({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Stack spacing={ 2 } pt={ 2 }>
            <FormControl fullWidth>
              <InputLabel id="sender-select">Sender</InputLabel>
              <Select
                error={ !!(touched.senderId && errors.senderId) }
                labelId="sender-select"
                id="demo-simple-select-helper"
                value={ values.senderId }
                label="Sender"
                onChange={ e => setFieldValue('senderId', e.target.value) }
              >
                { AUTH_USERS.map(user =>
                  <MenuItem key={ user.id } value={ user.id }>{ user.email }</MenuItem>
                ) }
              </Select>
              <FormHelperText
                error={ !!(touched.senderId && errors.senderId) }>{ (touched.senderId && errors.senderId) || ' ' } </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="recipient-select">Recipient</InputLabel>
              <Select
                error={ !!(touched.recipientId && errors.recipientId) }
                labelId="recipient-select"
                value={ values.recipientId }
                label="Recipient"
                onChange={ e => setFieldValue('recipientId', e.target.value) }
              >
                { AUTH_USERS.map(user =>
                  <MenuItem key={ user.id } value={ user.id }>{ user.email }</MenuItem>
                ) }
              </Select>
              <FormHelperText
                error={ !!(touched.recipientId && errors.recipientId) }>{ (touched.recipientId && errors.recipientId) || ' ' } </FormHelperText>
            </FormControl>

            <TextField
              id="outlined-number"
              label="Tokens amount"
              type="number"
              InputLabelProps={ {
                shrink: true
              } }
              error={ !!(touched.amount && errors.amount) }
              value={ values['amount'] }
              onChange={ e => setFieldValue('amount', e.target.value) }
              helperText={ (touched.amount && errors.amount) || ' ' }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
            >
              Request
            </Button>
          </Stack>
        </Form>
      ) }
    </Formik>
  );
}