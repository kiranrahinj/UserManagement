import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./Component/Common/Navbar"
import LoginPage from './Component/Auth/LoginPage';
import RegistrationPage from './Component/Auth/RegistrationPage';
import ProfilePage from './Component/userspage/ProfilePage';
import UserService from './Component/Service/UserService';
import UserManagement from "./Component/userspage/UserManagementPage"
import UpdateUser from './Component/userspage/UpdateUser';
import Footer from "./Component/Common/Footer"
function App() {
  return (
    <BrowserRouter>
      <div className='h-screen'>
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<LoginPage/>}/>
            <Route exact path='/login' element={<LoginPage/>}/>
            <Route exact path='/profile' element={<ProfilePage/>}/>.

            {UserService.adminOnly() && (
              <>
                <Route path='/register' element={<RegistrationPage/>} />
                <Route path='/admin/user-management' element={<UserManagement/>} />
                <Route path='/update-user/:userId' element={<UpdateUser/>} />
              </>
            )}

          <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
