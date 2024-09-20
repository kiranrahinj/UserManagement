import React from "react";
import UserService from "../Service/UserService";
import { Link } from "react-router-dom";


function Navbar() {

  const Authenticated = UserService.isAuthenticated();
  const Admin = UserService.isAdmin();

  const handlelogout = () => {
    const confirmResponse = window.confirm("Are you sure to logout")
    if(confirmResponse) UserService.logout() ;
  };
  return (
    <div>
      <nav className="bg-indigo-400 p-4">
        <ul className="flex justify-evenly text-white">
          {!Authenticated && (
            <li>
              <Link to="/">Kiran Dev</Link>
            </li>
          )}
          {Authenticated && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {Admin && (
            <li>
              <Link to="/admin/user-management">User Management</Link>
            </li>
          )}
          {Authenticated && (
            <li>
              <Link to="/" onClick={handlelogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
