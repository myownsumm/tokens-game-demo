import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../auth/providers/auth.provider.tsx';
import { SocketsConnector } from '../messages/components/SocketsConnector/SocketsConnector.tsx';
import Avatar from '@mui/material/Avatar';
import MessagesProvider from '../messages/providers/messages.provider.tsx';


const drawerWidth: number = 240;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create([ 'width', 'margin' ], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);

const defaultTheme = createTheme();

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const [ open, setOpen ] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { persistUser, authUser } = useAuth();

  function logout(): void {
    persistUser(undefined);
  }

  return (
    <MessagesProvider>
      <ThemeProvider theme={ defaultTheme }>
        <Box sx={ { display: 'flex' } }>
          <CssBaseline/>
          <AppBar position="absolute" open={ open }>
            <Toolbar
              sx={ {
                pr: '24px' // keep right padding when drawer closed
              } }
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={ toggleDrawer }
                sx={ {
                  marginRight: '36px',
                  ...(open && { display: 'none' })
                } }
              >
                <MenuIcon/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={ { flexGrow: 1 } }
              >
                Dapp - Penalty
              </Typography>
              <SocketsConnector/>

              <Avatar sx={ { m: 2, bgcolor: 'secondary.main' } } alt={ authUser?.email } src={ authUser?.avatar }/>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={ open }>
            <Toolbar
              sx={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [ 1 ]
              } }
            >
              <IconButton onClick={ toggleDrawer }>
                <ChevronLeftIcon/>
              </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
              <React.Fragment>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard"/>
                </ListItemButton>
                <ListItemButton onClick={ logout }>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
                </ListItemButton>
              </React.Fragment>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={ {
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto'
            } }
          >
            <Toolbar/>
            { children }
          </Box>
        </Box>
      </ThemeProvider>
    </MessagesProvider>
  );
};

export default AuthLayout;
