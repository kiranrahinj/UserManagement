import React, { useState } from "react";
import UserService from "../Service/UserService";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    city: "",
  });
  const [error,setError]=useState("");

  const navigate=useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response=await UserService.register(formData);

      if(!!response)navigate("/admin/user-management");

    } catch (error) {
      console.log(error);
      setError(error);

      setTimeout(() => {
        setError("");
      }, 10000);
    }
    setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        city: "",
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    
       <div className="mx-auto p-5 w-[500px] bg-slate-200 items-center mt-9 border rounded-xl">
      <h2 className="font-extrabold">Register User</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleForm} className=" form-group flex flex-col gap-4 p-4">
        <div className='w-80'>
          <label>Name</label> <br />
          <input
            className="p-2 rounded-lg w-full"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleChange}
          />
        </div>
        <div className='w-80'>
          <label>Email</label> <br />
          <input
            className="p-2 rounded-lg w-full"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className='w-80'>
            <label>Password</label>
            <br />
            <input
              className="p-2 rounded-lg w-full"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
            />
          </div>
        <div className='w-80'>
          <label>City</label> <br />
          <input
            className="p-2 rounded-lg w-full"
            type="text"
            name="city"
            value={formData.city}
            placeholder="Enter City"
            onChange={handleChange}
          />
        </div>
        <div className='w-80'>
          <label>Role</label> <br />
          <input
            className="p-2 rounded-lg w-full"
            type="text"
            name="role"
            value={formData.role}
            placeholder="Enter Role"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="bg-indigo-600 p-2 rounded-md w-32 text-white">
          Submit
        </button>
      </form>
    </div>
    );
}

export default RegistrationPage;
