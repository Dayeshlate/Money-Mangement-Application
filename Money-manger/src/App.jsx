import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContextProvider } from "./context/AppContext";


// Pages
import Home from './pages/Home'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Toast (fix spelling)
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </>
  )
}
const Root = () => {
  const isAuthenticated = !!localStorage.getToken("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (

    <Navigate to="/dashboard"></Navigate>
  )
}

export default App
