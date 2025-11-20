import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'

function Income() {
  useUser();
  return (
    <Dashboard activeMenu="Income">
      This is the income
    </Dashboard>
  )
}

export default Income