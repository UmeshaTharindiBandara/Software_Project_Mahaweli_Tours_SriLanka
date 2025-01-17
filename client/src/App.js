import './styles/App.css';

import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import TourPackage from './components/TourPackage/TourPackage';
import CustomizeTour from './components/TourPackage/CustomizeTour';

import AdminDashboard from "./components/admin/AdminDashboard";
import AddPackages from "./components/admin/AddPackages";
import EditPackages from "./components/admin/EditPackages";

import ProfilePage from "./components/user/Profile";
import UserPacakge from "./components/user/UserPackage";
import AddNew from './components/admin/AddNew';
import AddNewEdit from './components/admin/AddNewEdit';
import AddedPackage from './components/admin/AddedPackage';
import AddedLocation from './components/admin/AddedLocation';

import Chat from "./components/chat/Chat";
import SelectedPackage from './components/TourPackage/SelectedPackage';

import Signup from "./components/registration/Signup";
import Login from "./components/registration/Login";

function App() {
  return (
    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/tour" element={<TourPackage/>}/>
          <Route path="/tour/:id" element={<CustomizeTour/>}/>
		  
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

          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>

        </Routes>
        <Footer/>
      </Router>
    
  );
}

export default App;