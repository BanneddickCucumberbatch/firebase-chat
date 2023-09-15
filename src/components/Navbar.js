import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { LOGIN_ROUTE } from '../utils/consts';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Context } from '..';


const Navbar = () => {

  const {auth} = useContext(Context);
  const [user, setUser] = useState(null)
  
  onAuthStateChanged (auth, (user) => {
      if (user) {
          setUser(user)
      } else {
          setUser(null)
      }
    });


    return ( 
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar variant='dense'>
          <Grid container justifyContent={'flex-end'} >
            {user ?
                   <Button variant='contained' color='error' onClick={() => signOut(auth)}>Sign out</Button>
                  :
                  <NavLink to={LOGIN_ROUTE}>
                    <Button variant='contained' color='success'>Login</Button>
                  </NavLink>
                   
            }
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
     );
}
 
export default Navbar;
