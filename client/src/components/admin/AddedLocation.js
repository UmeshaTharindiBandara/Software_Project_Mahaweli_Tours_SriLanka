import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Added = () => {
  const [tours, setTours] = useState([]);
  const [area, setArea] = useState("");
  const [locations, setLocations] = useState([{ name: "", image: "" }]);
  const [areas, setAreas] = useState([]);
  const [editingArea, setEditingArea] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/tours/${id}`)
          .then(() => {
            setTours(tours.filter((tour) => tour._id !== id));
            Swal.fire("Deleted!", "Your tour has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the tour.", "error");
          });
      } else {
        Swal.fire("Cancelled", "Your tour is safe :)", "info");
      }
    });
  };

  const handleViewPackage = (id) => {
    navigate(`/tour/${id}`);
  };


  const handleEditArea = (areaId) => {
    const areaToEdit = areas.find((area) => area._id === areaId);
    setEditingArea(areaToEdit);
    setArea(areaToEdit.area);
    setLocations(areaToEdit.locations);
    navigate(`/edit-area/${areaId}`);
  };

  
  const handleDeleteArea = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/areas/${id}`)
          .then(() => {
            setAreas(areas.filter((area) => area._id !== id));
            Swal.fire("Deleted!", "The area has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the area.", "error");
          });
      }
    });
  };

  return (
    <div >
      <Button
                variant="outlined"
                onClick={() => navigate("/admin")}
                className="back-button"
                startIcon={<ArrowBackIcon />}
                style={{marginLeft:"800px"}}
              >
                Back to Dashboard
              </Button>
              <br/>
              <br/>
      
      <br/>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "10px",
          marginLeft:"10px",
        }}
      >
     

            {/* Display Areas Section */}
            <div style={{marginTop:"-50px", marginLeft:"30px", marginRight:"20px"}}>
                <h1>Available Areas</h1>
                <br/><br/>
                {areas.map((area, index) => (
                <div key={index} className="area-card">
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <h3>{area.area}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {area.locations.map((location, idx) => (
                            <li
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '15px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                            }}
                            >
                            {/* Location Name */}
                            <div style={{ flex: 1, marginRight: '20px' }}>
                                <p
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: '#333',
                                }}
                                >
                                {location.name}
                                </p>
                            </div>

                            {/* Location Image */}
                            <div style={{ width: '120px', height: '120px' }}>
                                <img
                                src={location.image}
                                alt={location.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                                />
                            </div>
                            </li>
                        ))}
                        </ul>

                        <Button
                        onClick={() => handleEditArea(area._id)}
                        variant="contained"
                        color="primary"
                        backgroundColor= "yellowgreen"
                        sx={{ marginTop: '10px' }}
                        style={{ backgroundColor: "#28a745", color: "#ffffff", marginTop: "10px" }}
                        >
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "8px" }} />
                        Edit Locations
                        </Button>
                        <br/>
                        <Button
                            onClick={() => handleDeleteArea(area._id)}
                            variant="contained"
                            color="error"
                            sx={{ marginTop: '10px' }}
                            >
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px" }} />    
                            Delete Area
                        </Button>
                    </AccordionDetails>
                    </Accordion>
                    
                </div>
                ))}
            </div>
           
      </div>
      <br/>
    </div>
  );
};

export default Added;
