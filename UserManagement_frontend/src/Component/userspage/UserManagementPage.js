import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";
import { Link } from "react-router-dom";

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.usersList);
    } catch (error) {
      console.log("Error while fetching :", error);
    }
  };

  const deleteUser = async (userId) => {
    const result = window.confirm("Are you!! You want to delete this user");
    try {
      if (result) {
        const token = localStorage.getItem("token");
        const response = await UserService.deleteByUserId(userId, token);
        alert(response.message);

        fetchUsers();
      }
    } catch (error) {
      console.log("Error while fetching :", error);
    }
  };

  return (
    <div className="bg-slate-400 mt-10  mx-auto border  border-slate-300 w-[700px] p-4">
      
        <div>
          <h2 className=" font-medium flex flex-row justify-center mx-auto">
            User Management Page
          </h2>
          <button className="bg-red-600 mb-3 mt-1 text-white p-2 rounded-3xl flex flex-row justify-center mx-auto">
            <Link to="/register">Add User</Link>
          </button>
        </div>

        <table class="bg-slate-200 rounded-lg border-separate border border-slate-400 ...">
          <thead>
            <tr>
              <th class="border border-slate-300 ...">ID</th>
              <th class="border border-slate-300 ...">Name</th>
              <th class="border border-slate-300 ...">Email</th>
              <th class="border border-slate-300 ...">City</th>
              <th class="border border-slate-300 ...">ROle</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, i) => (
              <tr key={i}>
                <td class="border border-slate-300 p-4 ">{i + 1}</td>
                <td class="border border-slate-300 p-5">{user.name}</td>
                <td class="border border-slate-300 p-5">{user.email}</td>
                <td class="border border-slate-300 p-5">{user.city}</td>
                <td className="flex gap-2  p-6 border border-slate-300">
                  <button
                    className="bg-red-500 p-4 rounded-lg text-white"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button className="bg-green-400 p-4 rounded-lg  text-white">
                    <Link to={`/update-user/${user.id}`}>Update</Link>
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
          
        </table>
        <div className="flex flex-row gap-5 text-white">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
           
            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            </div>
    
    </div>
  );
}

export default UserManagementPage;
