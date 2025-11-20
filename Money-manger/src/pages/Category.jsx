import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'

function Category() {
  useUser();
  return (
    <Dashboard activeMenu="Category">
      This is the category
    </Dashboard>
  )
}

export default Category