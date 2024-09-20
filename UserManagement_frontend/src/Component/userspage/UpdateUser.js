import React, { useEffect, useState } from 'react';
import UserService from '../Service/UserService';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    city: '',
    password:''
  });

  const {userId} = useParams();
 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchByUserId(userId);
  }, [userId]);

  const fetchByUserId = async (userId) => {

    // console.log(userId);    
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getByUserId(userId, token);     
      setFormData(response.users);
    } catch (error) {
      setError(error.message); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const confirmData = window.confirm('Do you want to update it?');
    if (confirmData) {
      try {      
        const token = localStorage.getItem('token');
        await UserService.updateUser(userId,formData,token); 
        navigate('/admin/user-management');
      } catch (error) {
        setError(error.message); // Error handling
      }
    }
  };
  setTimeout(()=>{
    setError("");
  },5000)

  return (
    <div className="mx-auto p-5 w-[500px] bg-slate-200 items-center mt-9 border rounded-xl">
      <h2 className="font-extrabold">Update User</h2>
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

export default UpdateUser;
