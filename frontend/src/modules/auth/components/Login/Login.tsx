import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useAuth } from '../../providers/auth.provider.tsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LoginData } from '../../auth.typings.ts';
import { useNavigate } from 'react-router-dom';
import { USER_IAN_NAME, USER_JOHN_NAME, USER_KATE_NAME, USERS_TO_IDS } from '../../mock.ts';


export function Login() {
  const { persistUserId } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Required')
  });

  function login(data: LoginData): void {
    persistUserId(data.userId)

    navigate('/');
  }

  return (
    <>
      <Formik
        initialValues={ {
          userId: '111',
          password: ''
        } }
        validationSchema={ validationSchema }
        onSubmit={ values => {
          // same shape as initial values
          login(values);
        } }
      >
        { ({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Grid container rowSpacing={ 2 } columnSpacing={ 2 } direction={ 'column' }
                  justifyContent={ 'space-evenly' }
                  alignItems={ 'center' }>
              <Grid item xs={ 6 }>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Name</InputLabel>
                  <Select
                    name="userId"
                    labelId="demo-simple-select-label"
                    defaultValue={ '111' }
                    label="Name"
                    onChange={ e => setFieldValue('userId', e.target.value) }
                  >
                    <MenuItem value={ USERS_TO_IDS[USER_JOHN_NAME] }>{ USER_JOHN_NAME }</MenuItem>
                    <MenuItem value={ USERS_TO_IDS[USER_IAN_NAME] }>{ USER_IAN_NAME }</MenuItem>
                    <MenuItem value={ USERS_TO_IDS[USER_KATE_NAME] }>{ USER_KATE_NAME }</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={ 6 }>
                <TextField fullWidth error={ !!(touched.password && errors.password) }
                           value={ values['password'] }
                           name="password"
                           label="Password"
                           type={ 'password' }
                           helperText={ touched.password && errors.password }
                           onChange={ e => setFieldValue('password', e.target.value) }
                           variant="outlined"/>
              </Grid>

              <Grid item xs={ 6 }>
                <Button variant="contained" type={ 'submit' }>Login</Button>
              </Grid>
            </Grid>
          </Form>
        ) }
      </Formik>
      {/*</Grid>*/ }
    </>
  );
}
