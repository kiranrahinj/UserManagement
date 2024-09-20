import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);

      if (response && response.users) {
        setProfileInfo(response.users);
      } else {
        setErrorMessage("User data not found");
      }
    } catch (error) {
      console.log("Error Fetching error:", error);
      setErrorMessage("Failed to fetch profile information.");
    }
  };

  return (
    <div className="flex flex-row justify-center mt-10">
      <div className="bg-slate-300 p-8 rounded-2xl w-[700px]">
        <h2 className="mb-2">Profile Information</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p>Id: {profileInfo.id}</p>
        <p>Name: {profileInfo.name}</p>
        <p>Email: {profileInfo.email}</p>
        <p>City: {profileInfo.city}</p>
        {profileInfo.role === "ADMIN" && (
          <button className="bg-indigo-600 p-2 rounded-3xl mt-6 text-white">
            <Link to={`/update-user/${profileInfo.id}`}>Update this user</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
