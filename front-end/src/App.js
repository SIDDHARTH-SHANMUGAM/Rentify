import React from 'react'
import Login from './LogIn/Login'
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import SignIn from './LogIn/SignIn';
import Home from './Home/Home';
import Contact from './Contact/Contact';

function Protected({children }){
  const user = JSON.parse(sessionStorage.getItem('token'));
  if(!user)
    return <Navigate to='/' replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/home' element={ <Home/> } />
        <Route path='/contact' element={ <Protected><Contact/></Protected> } />
        <Route path="*" element={ <PageNotFound/> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
