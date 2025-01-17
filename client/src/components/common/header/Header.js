import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
//import Head from "./Head";
import "./header.css";
import Head from  "./Head";


const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [isLoginVisible] = useState(false);
  const [isSignupVisible] = useState(false);
  const [isForgotPasswordVisible] = useState(false);
  const [isProfileVisible] = useState(false);
  const [ setEmail] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const profileIcon = "/images/profile1.png";




  useEffect(() => {
    if (loggedInUser) {
      setEmail(loggedInUser.email || "");  // Assuming loggedInUser has email, adjust if needed
    }
  }, [loggedInUser]);

  const showMessageTemporarily = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  
  const handleLogout = () => {
    setLoggedInUser(null);
    showMessageTemporarily("Logged out successfully!", "success");
    navigate("/");
  };

  
  

  return (
    <>
      <Head/>
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            
            <li>
              <Link
                to="/tour"
                onClick={(e) => {
                  if (!loggedInUser) { 
                    e.preventDefault(); 
                    showMessageTemporarily("Please log in to access Tour Packages.", "error");
                    navigate("/signup")
                  }
                }}
              >
                Tour Packages
              </Link>
            </li>
          </ul>
          <div className="button-container">
          {loggedInUser ? (
      <>
        <span>Hi, {loggedInUser}</span>
        <li onClick={() => navigate("/profile")}>
          <img
            src={profileIcon}
            alt="Profile Icon"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
        </li>
        <button className="btn btn-signin" onClick={handleLogout}>
          <b>Logout</b>
        </button>
      </>
    ) : (
      <>
        <li
          onClick={() => {
            alert("Please log in to access your profile."); // Show login prompt
          }}
        >
          <img
            src={profileIcon}
            alt="Profile Icon"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
        </li>
                <button className="btn btn-signin" align='center' onClick={() => navigate("/signup")}>
                  <b>Sign In</b>
                </button>
              </>
            )}
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>

      {message && (
        <div className={`message ${messageType}`} onClick={() => setMessage('')}>
          {message}
        </div>
      )}

      {(isLoginVisible || isSignupVisible || isForgotPasswordVisible || isProfileVisible) && (
        <div className="blur-background"></div>
      )}

      

    </>
  );
};

export default Header;
