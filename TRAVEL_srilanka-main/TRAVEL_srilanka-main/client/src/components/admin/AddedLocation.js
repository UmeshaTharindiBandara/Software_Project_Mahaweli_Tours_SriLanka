import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AddedLocations.css";

const Added = () => {
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditArea = (areaId) => {
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

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <div className="added-container">
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        className="back-button"
      >
        Back to Dashboard
      </Button>

      <div className="areas-container">
        <h1 className="page-title">Available Areas</h1>
        {areas.map((area, index) => (
          <Accordion key={index} className="area-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{area.area}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="locations-container">
                <Typography variant="h6">Locations in {area.area}</Typography>
                <div className="locations">
                  {area.locations.map((location, idx) => (
                    <div key={idx} className="location-item">
                      <Typography variant="body1" className="location-name">
                        {location.name}
                      </Typography>
                      <img
                        src={location.image}
                        alt={location.name}
                        className="location-image"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="area-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditArea(area._id)}
                  className="area-action-button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit Area
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteArea(area._id)}
                  className="area-action-button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete Area
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Added;
