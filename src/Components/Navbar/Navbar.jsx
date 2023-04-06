import React from "react";
import "./style.css"
import mlsaLogo from "/assets/mlsaLogo.svg";
export default function Navbar() {
  return (
    <div className="registrationNavbar">
      <div className="registrationNavbarLogo">
        <img src={mlsaLogo} />
        <h3>MLSA</h3>
      </div>
    </div>
  );
}
