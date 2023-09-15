import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import Loader from './components/Loader';

const App = () => {

  const {auth} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && !auth.currentUser)
    setLoading(false)
  console.log(auth)
  }, [auth])

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <Navbar></Navbar>
      <AppRouter />
    </Router>
  );
}

export default App;
