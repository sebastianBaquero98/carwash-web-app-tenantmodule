"use client";

import Tenants from "@components/Tenants";
import ButtonNewTenant from "@components/ButtonNewTenant";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="admin-main-container">
      <div className="admin-main-box">
        <div className='tabs-button-container'>
          <div className='add-user-box'>
            <ButtonNewTenant />
          </div>
          <div className="signout-box">
            <button className="general-add-button" type="button" onClick={() => {
              signOut();
            }}>
              Sign Out
            </button>
          </div>
        </div>
        <div className='tabs-content-container'>
        <div className="users-main-container">
          <Tenants />
        </div>
        </div>  
      </div>
    </div>
  )
}

export default Home