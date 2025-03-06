import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import "./EditPackages.css"; 
import axios from "axios";
import Swal from "sweetalert2";
import { TextField, Button, Box, Typography, Grid, IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditPackages = () => {
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    budget: "",
    duration: "",
    highlights: "",
    image: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => {
        const { name, description, budget, duration, highlights, image } = res.data.data;
        setPackageData({
          name,
          description,
          budget,
          duration,
          highlights: highlights.join(", "),
          image,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch package details. Please try again later.", "error");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/tours/${id}`, {
        ...packageData,
        highlights: packageData.highlights.split(","),
      })
      .then(() => {
        Swal.fire("Updated!", "Your package has been updated.", "success");
        navigate(`/addedpackage`);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update the package", "error");
      });
  };

  return (
    <Box className="edit-package-container">
      <Box className="header-section">
        <Typography variant="h3" className="header-title">
          Edit Tour Package
        </Typography>
        <Typography variant="body1" className="header-subtitle">
          Update the details of your existing tour package.
        </Typography>
      </Box>

      <form id="tour-form" onSubmit={handleSubmit}>
        <Box className="form-section">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Package Name"
                variant="outlined"
                fullWidth
                required
                value={packageData.name}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <StarIcon className="input-icon" />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={packageData.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="budget"
                label="Budget (in USD)"
                variant="outlined"
                fullWidth
                required
                value={packageData.budget}
                onChange={handleInputChange}
                type="number"
                min="1"
                InputProps={{
                  startAdornment: <AttachMoneyIcon className="input-icon" />,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="duration"
                label="Duration"
                variant="outlined"
                fullWidth
                required
                value={packageData.duration}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <CalendarTodayIcon className="input-icon" />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="highlights"
                label="Highlights (comma-separated)"
                variant="outlined"
                fullWidth
                required
                value={packageData.highlights}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <StarIcon className="input-icon" />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="image"
                label="Image URL"
                variant="outlined"
                fullWidth
                required
                value={packageData.image}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <CollectionsIcon className="input-icon" />,
                }}
              />
            </Grid>

            <Grid item xs={12} className="form-actions">
              <Button
                variant="contained"
                type="submit"
                className="submit-button"
              >
                Update Package
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin")}
                className="back-button"
                startIcon={<ArrowBackIcon />}
              >
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default EditPackages;
