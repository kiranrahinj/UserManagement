import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
      } else {
        setError(userData.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setError(error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setEmail("");
    setPassword("");
    navigate("/profile");
  };

  return (
    <>
      <div className="mt-[200px] mx-auto h-90 w-[350px] bg-slate-100 rounded-3xl p-2">
        <h2 className=" font-extrabold text-center p-3">Login form</h2>
        {error && <p className="error-message">{error}</p>}
        <form
          onSubmit={handleForm}
          className=" my-auto  flex flex-col justify-center"
        >
          <div className="mx-auto p-6  gap-5 flex flex-col justify-center">
            <div className="">
              <label>Email</label> <br />
              <input
                className="p-1 rounded-lg mt-2"
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                className="p-1 rounded-xl mt-2"
                type="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-auto">
            <button type="submit" className="text-white bg-indigo-600 p-2 rounded-md mb-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
