import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from '../src/Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

import PopularClasses from '../src/Components/PopularClasses';
import DashboardLayout from './Pages/userDashboard/DashboardLayout';
import DashboardHome from './Pages/userDashboard/DashboardHome';
import Profile from './Pages/userDashboard/Profile';
import Classes from './Pages/userDashboard/Classes';
import MyBookings from './Pages/userDashboard/MyBookings';
import Payments from './Pages/userDashboard/Payments';
import Feedback from './Pages/userDashboard/Feedback';
import ClassDetails from "./Pages/userDashboard/ClassDetails";
import Booking from "./Pages/userDashboard/Booking";
import Schedule from "./Pages/userDashboard/Schedule";
import Trainers from "./Pages/Trainers";
import TrainerDetails from "./Pages/TrainerDetails";
import TrainerDashboardLayout from "./Pages/trainer/TrainerDashBoardLayout";
import TrainerHome from "./Pages/trainer/TrainerHome";
import TrainerProfile from "./Pages/trainer/TrainerProfile";
import TrainerSchedule from "./Pages/trainer/TrainerSchedule";
import TrainerBookings from "./Pages/trainer/TrainerBookings";
import TrainerStudents from "./Pages/trainer/TrainerStudents";
import TrainerReviews from "./Pages/trainer/TrainerReviews";
import AddClass from "./Pages/trainer/AddClass";
import ChangeSlot from './Pages/userDashboard/ChangeSlot';

import AdminDashboard from "./Pages/adminPerson/AdminDashboard";
import AdminLayout from './Pages/adminPerson/AdminLayout';
import AdminUsers from "./Pages/adminPerson/AdminUsers";
import AdminTrainers from "./Pages/adminPerson/AdminTrainers";
import AdminClasses from "./Pages/adminPerson/AdminClasses";
import AdminBookings from "./Pages/adminPerson/AdminBookings";
import ReferralOfferManagement from "./Pages/Admin/ReferralOfferManagement";
import ReferralOffer from './Pages/userDashboard/ReferralOffer';
const App = () => {
  return (
    <div>
     
 <div>
        <ToastContainer />
      </div>

      <div>
        <BrowserRouter>
          
          <div>
          <Navbar />
        </div>
         
         <div>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
<Route path="/classes" element={<PopularClasses />} />

  <Route path="/login" element={<Login />} />
   <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:id/:token" element={<ResetPassword />}  />
  <Route path="/register" element={<Register />} />
<Route path="/trainers" element={<Trainers />} />


<Route path="/trainers/:id" element={<TrainerDetails />} />


<Route
  path="/trainer"
  element={
    <ProtectedRoute role="trainer">
      <TrainerDashboardLayout />
    </ProtectedRoute>
  }
>

  <Route index element={<TrainerHome />} />

  <Route path="profile" element={<TrainerProfile />} />

  <Route path="add-class" element={<AddClass />} />

  <Route path="schedule" element={<TrainerSchedule />} />

  <Route path="bookings" element={<TrainerBookings />} />

  <Route path="students" element={<TrainerStudents/>}/>

  <Route path="reviews" element={<TrainerReviews />} />

</Route>
  
  
  

 <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="user">
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="classes" element={<Classes />} />
  <Route path="classes/:id" element={<ClassDetails />} />
  <Route path="booking/:id" element={<Booking />} />
  <Route path="bookings" element={<MyBookings />} />
  <Route path="schedule" element={<Schedule />} />
  <Route path="payments" element={<Payments />} />
   <Route path="change-slot/:id" element={<ChangeSlot />} />
  <Route path="feedback" element={<Feedback />} />

  <Route
  path="referral"
  element={<ReferralOffer />}
/>
  
</Route>

<Route
  path="/admin"
  element={<AdminLayout />}
>

  <Route
    index
    element={<AdminDashboard />}
  />

  <Route
    path="users"
    element={<AdminUsers />}
  />

  <Route
    path="trainers"
    element={<AdminTrainers />}
  />

  <Route
    path="classes"
    element={<AdminClasses />}
  />

  <Route
    path="bookings"
    element={<AdminBookings />}
  />

  <Route
    path="referral-offer"
    element={<ReferralOfferManagement />}
  />  
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