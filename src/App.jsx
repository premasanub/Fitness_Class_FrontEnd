import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import DashboardLayout from './Pages/dashboard/DashboardLayout';
import DashboardHome from './Pages/dashboard/DashboardHome';
import Profile from './Pages/dashboard/Profile';
import Classes from './Pages/dashboard/Classes';
import MyBookings from './Pages/dashboard/Bookings';
import Payments from './Pages/dashboard/Payments';
import Feedback from './Pages/dashboard/Feedback';
import ClassDetails from "./Pages/dashboard/ClassDetails";
const App = () => {
  return (
    <div>
     
      <div>
        <BrowserRouter>
          
          <div>
          <Navbar />
        </div>
         
         <div>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  

 <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="classes" element={<Classes />} />
  <Route path="classes/:id" element={<ClassDetails />} />
  <Route path="bookings" element={<MyBookings />} />
  <Route path="payments" element={<Payments />} />
  <Route path="feedback" element={<Feedback />} />
</Route>
</Routes>
        </div>

       <div>  
        <Footer />
       </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;