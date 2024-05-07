"use client";
import Tenants from "@components/Tenants";
import ButtonNewTenant from "@components/ButtonNewTenant";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="admin-main-container">
      <div className="admin-main-box">
        <div className="tabs-button-container">
          <div className="add-user-box">
            <ButtonNewTenant />
            <div
              style={{
                marginLeft: "50px",
                height: "38px",
                borderRadius: "10px",
                width: "200px",
                backgroundColor: "#219EBC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                style={{ color: "white", fontWeight: "normal" }}
                href={`/locations`}
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
          <div className="signout-box">
            <button
              className="general-add-button"
              type="button"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="tabs-content-container">
          <div className="users-main-container">
            <Tenants />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
