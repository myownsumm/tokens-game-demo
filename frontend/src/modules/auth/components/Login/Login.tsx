import { useAuth } from '../../providers/auth.provider.tsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../auth.typings.ts';
import { getUserByEmail } from '../../auth.mock.ts';
import { useNotifications } from '@u-cat/u-notifications/dist/providers/u-notifications.provider';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" { ...props }>
      { 'Copyright © ' }
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
}

const defaultTheme = createTheme();


export function Login() {
  const navigate = useNavigate();
  const { persistUser } = useAuth();
  const { danger } = useNotifications();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  function login(data: AuthPayload): void {
    // Just for Demo purposes we are pulling mocked user in this way
    const authUser = getUserByEmail(data.email);

    if (!authUser) {
      danger(`User ${ data.email } not found`);
      return;
    }

    persistUser(authUser);

    navigate('/');
  }

  return (
    <>
      <ThemeProvider theme={ defaultTheme }>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
            sx={ {
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            } }
          >
            <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>


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
                  <Box sx={ { mt: 1 } }>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={ !!(touched.email && errors.email) }
                      value={ values['email'] }
                      onChange={ e => setFieldValue('email', e.target.value) }
                      helperText={ (touched.email && errors.email) || ' ' }
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={ (touched.password && errors.password) || ' ' }
                      onChange={ e => setFieldValue('password', e.target.value) }
                      error={ !!(touched.password && errors.password) }
                    />
                    <FormControlLabel
                      disabled
                      control={ <Checkbox value="remember" color="primary"/> }
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={ { mt: 3, mb: 2 } }
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          { 'Don\'t have an account? Sign Up' }
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              ) }
            </Formik>
          </Box>
          <Copyright sx={ { mt: 8, mb: 4 } }/>
        </Container>
      </ThemeProvider>
    </>
  );
}
