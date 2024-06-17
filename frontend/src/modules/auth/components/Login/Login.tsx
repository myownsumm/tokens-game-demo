import { Button, Grid, TextField } from '@mui/material';
import { useAuth } from '../../providers/auth.provider.tsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Api } from '../../../../api/api.ts';


export function Login() {
  // const actionUrl = `${ process.env.NX_PUBLIC_AUTH_API_URL }/auth/login`;
  // const actionMethod = 'POST';

  // const { persistToken } = useAuth();
  // const { addNotification } = useNotifications();
  //
  // const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  function login(data: { email: string, password: string }): void {
    const api = new Api();
    api.login(data);

    const { persistToken } = useAuth();
    persistToken('123123')

    console.log('login', data);
  }

  return (
    <>
      <Formik
        initialValues={ {
          email: '',
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
                <TextField fullWidth name="email" label="Email" variant="outlined"
                           error={ !!(touched.email && errors.email) }
                           value={ values['email'] }
                           onChange={ e => setFieldValue('email', e.target.value) }
                           helperText={ touched.email && errors.email }/>
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
