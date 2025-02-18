import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";

import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import TourPackage from './components/TourPackage/TourPackage';
import CustomizeTour from './components/TourPackage/CustomizeTour';
import SelectedPackage from './components/TourPackage/SelectedPackage';
import ViewCustomizedPackage from "./components/TourPackage/ViewCustomizedPackage";

import AdminDashboard from "./components/admin/AdminDashboard";
import AddPackages from "./components/admin/AddPackages";
import EditPackages from "./components/admin/EditPackages";
import AddNew from './components/admin/AddNew';
import AddNewEdit from './components/admin/AddNewEdit';
import AddedPackage from './components/admin/AddedPackage';
import AddedLocation from './components/admin/AddedLocation';

import ProfilePage from "./components/user/Profile";
import UserPacakge from "./components/user/UserPackage";
import Chat from "./components/chat/Chat";

import Signup from "./components/registration/Signup";
import Login from "./components/registration/Login";

const AppContent = () => {
  const location = useLocation();

  // Hide Header and Footer for these routes
  const hideHeaderFooterRoutes = [
    "/view-customized-package",
    location.pathname.startsWith("/tour/") // Hides for any /tour/:id
  ];

  return (
    <>
      {!hideHeaderFooterRoutes.includes(true) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tour" element={<TourPackage />} />
        <Route path="/tour/:id" element={<CustomizeTour />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add" element={<AddPackages />} />
        <Route path="/edit/:id" element={<EditPackages />} />
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/userpackage" element={<UserPacakge />} />
        <Route path="/addnew" element={<AddNew />} />
        <Route path="/edit-area/:id" element={<AddNewEdit />} />
        <Route path="/addedpackage" element={<AddedPackage />} />
        <Route path="/addedlocation" element={<AddedLocation />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/tour-package" element={<SelectedPackage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-customized-package" element={<ViewCustomizedPackage />} />
      </Routes>
      {!hideHeaderFooterRoutes.includes(true) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
