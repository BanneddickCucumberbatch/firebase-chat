import React from "react";
import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box"
import { useContext } from "react";
import { Context } from "..";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

    const {auth} = useContext(Context);
    
    const login = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    return ( 
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems="center"
                  justifyContent="center">
                <Grid style={{width: 400, background: 'lightgray'}}
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      direction={"column"}>
                    <Box p={5}>
                        <Button variant="contained" onClick={login}>Login with Google</Button>
                    </Box>    
                </Grid> 
            </Grid>
        </Container>
     );
}
 
export default Login;