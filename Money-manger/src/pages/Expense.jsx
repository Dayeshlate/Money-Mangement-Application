import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'

function Expense() {
  useUser();
  return (
    <Dashboard activeMenu="Expense">
      This is the expense
    </Dashboard>
  )
}

export default Expense