import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
//import Head from "./Head";
import "./header.css";
import Head from  "./Head";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    // Check if email is empty
    if (!email) {
      showMessageTemporarily("Please enter an email address.", "error");
      return;
    }
  
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      showMessageTemporarily("Please enter a valid email address.", "error");
      return;
    }
  
    axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((res) => {
        if (res.data.status === "Success") {
          if (res.data.role === "admin") {
            navigate("/admin");
          }
          else {
            navigate("/tour")
          }
          showMessageTemporarily("Login Successful!", "success");
          setLoggedInUser(res.data.username);
          setIsLoginVisible(false);
        } else {
          showMessageTemporarily("Login failed: " + res.data.message, "error");
        }
      })
      .catch((err) => {
        // Check for specific error messages
        if (err.response.status === 401) {
          showMessageTemporarily("Invalid email or password.", "error");
        } else if (err.response.status === 404) {
          showMessageTemporarily("Email not found in the database.", "error");
        } else {
          showMessageTemporarily(err.response.data.error || "An error occurred. Please try again.", "error");
        }
      });
  };
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
  
    // Check if username, email, or password is empty
    if (!username) {
      showMessageTemporarily("Please enter a username.", "error");
      return;
    }
  
    if (!email) {
      showMessageTemporarily("Please enter an email address.", "error");
      return;
    }
  
    if (!password) {
      showMessageTemporarily("Please enter a password.", "error");
      return;
    }
  
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      showMessageTemporarily("Please enter a valid email address.", "error");
      return;
    }

  
  
    axios
      .post("http://localhost:5000/api/signup", { username, email, password})
      .then((res) => {
        if (res.data.status === "Success") {
          showMessageTemporarily("Sign-Up Successful!", "success");
          setLoggedInUser(username);
          setIsSignupVisible(false);
        }
      })
      .catch((err) => {
        showMessageTemporarily(err.response.data.error || "An error occurred. Please try again.", "error");
      });
  };
  
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
  
    if (!email) {
      showMessageTemporarily("Please enter a valid email address", "error");
      return;
    }
  
    console.log("Email to be sent:", email); // Debugging line
  
    axios
      .post("http://localhost:5000/api/forgot-password", { email })
      .then((res) => {
        if (res.data.message === "Password reset email sent") { // Checking against the message from the backend
          showMessageTemporarily("Password reset email sent! Please check your inbox.", "success");
          setIsForgotPasswordVisible(false);
        } else {
          showMessageTemporarily("An unexpected response was received.", "error");
        }
      })
      .catch((err) => {
        console.error("Error response:", err.response);
        if (err.response?.status === 404) {
          showMessageTemporarily("Email not found. Please enter a registered email.", "error");
        } else {
          showMessageTemporarily(
            err.response?.data?.error || "An error occurred. Please try again.",
            "error"
          );
        }
      });
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

      {/* Login Form Popup */}
      {isLoginVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsLoginVisible(false)}>×</li>
          <div className="login-content">
            {/* Displaying the message */}
            {message && (
              <div className={`message-box ${messageType}`}>
                <span>{message}</span>
              </div>
            )}
            <form onSubmit={handleLoginSubmit}>
              <h2 align='center'>Login</h2>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-password">
                  <input
                    type="checkbox"
                    checked={isPasswordVisible}
                    onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                  <label>Show Password</label>
                </div>
              </div>
              <div className="forgot-password" onClick={() => setIsForgotPasswordVisible(true)}>
                <span>Forgot Password?</span>
              </div>
              <button type="submit" className="btn btn-signin w-100">Login</button>
              <div className="sign-up-link">
                <span>Don't have an account? </span>
                <span onClick={() => setIsSignupVisible(true)} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign-Up Form Popup */}
      {isSignupVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsSignupVisible(false)}>×</li>
          <div className="login-content">
            {/* Displaying the message */}
            {message && (
              <div className={`message-box ${messageType}`}>
                <span>{message}</span>
              </div>
            )}
            <form onSubmit={handleSignupSubmit}>
              <h2 align='center'>Sign Up</h2>
              <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  autoComplete="off"
                  name="name"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-password">
                  <input
                    type="checkbox"
                    checked={isPasswordVisible}
                    onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                  <label>Show Password</label>
                </div>
              </div>
              <button type="submit" className="btn btn-signin w-100">Sign Up</button>
            </form>
          </div>
        </div>
      )}


      {/* Forgot Password Popup */}
      {isForgotPasswordVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsForgotPasswordVisible(false)}>×</li>
          <div className="login-content">
            {/* Displaying the message */}
            {message && (
              <div className={`message-box ${messageType}`}>
                <span>{message}</span>
              </div>
            )}
            <form onSubmit={handleForgotPasswordSubmit}>
              <h2 align='center'>Forgot Password</h2>
              <br/><br/>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-signin w-100">Send Reset Link</button>
            </form>
          </div>
        </div>
      )}


      


    </>
  );
};

export default Header;
