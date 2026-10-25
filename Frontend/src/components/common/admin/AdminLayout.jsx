import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout
