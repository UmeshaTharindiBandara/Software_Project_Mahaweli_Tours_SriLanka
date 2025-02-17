
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './TourList.css'; 

const TourList = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  

  const handleViewPackage = (id) => {
    navigate(`/tour/${id}`);
  };


  return (
    <div className="tour-list-container">
       
      <h1>Available Tour Packages </h1>
      <div className="tour-list">
        {tours.map((tour) => (
          <div key={tour._id} className="tour-card" onClick={() => handleViewPackage(tour._id)} style={{ cursor: "pointer" }}>
               <img src={tour.image} alt={tour.name} />
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>
                  <br/>
                
                              
            
          </div>
        ))}
      </div>
      
  
    </div>
  );
};

export default TourList;