import React from 'react'
import TenantCreationForm from '@components/TenantCreationForm'

const AddTenant = () => {
  return (
    <div className="admin-main-container">
        <div className="admin-main-box">
        <TenantCreationForm />
        </div>
    </div>
  )
}

export default AddTenant