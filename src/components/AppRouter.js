import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import Loader from './Loader';
import { onAuthStateChanged } from 'firebase/auth';

const AppRouter = () => {
    
    const {auth} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        onAuthStateChanged (auth, (user) => {
            if (user || (auth && !auth.currentUser)) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(true)
            }
        });
      }, [auth])

      if (loading) {
        return <Loader />
      }
    
    return user ? 
        ( 
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component />} /> 
                )}
                <Route path='*' element={<Navigate to={CHAT_ROUTE} />}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}) => 
                        <Route key={path} path={path} element={<Component />} />     
                )}
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />}/>
            </Routes>
        )
}
 
export default AppRouter;