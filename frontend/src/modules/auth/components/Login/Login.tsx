import { useAuth } from '../../providers/auth.provider.tsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../auth.typings.ts';
import { getUserByEmail } from '../../auth.mock.ts';
import { useNotifications } from '@u-cat/u-notifications';


const defaultTheme = createTheme();

export function Login() {
  const navigate = useNavigate();
  const { persistUser } = useAuth();
  const { danger } = useNotifications();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  function login(data: AuthPayload): void {
    // Just for Demo purposes we are pulling mocked user in this way
    const authUser = getUserByEmail(data.email);

    if (!authUser) {
      danger(`User ${ data.email } not found`);
      return;
    }

    persistUser(authUser);

    navigate('/dashboard');
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={ { mt: 3, mb: 2 } }
                    >
                      Sign In
                    </Button>
                  </Box>
                </Form>
              ) }
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
