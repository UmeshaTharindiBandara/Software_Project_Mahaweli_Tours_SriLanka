import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./AddPackages.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from "@mui/icons-material/Timer";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddPackages = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [highlights, setHighlights] = useState("");
  const [image, setImage] = useState("");
  const [nextId, setNextId] = useState(1);

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/tours", {
        name,
        description,
        budget,
        duration,
        highlights: highlights.split(","),
        image,
      })
      .then((res) => {
        Swal.fire("Package Added Successfully!", "", "success");
        setNextId(nextId + 1);
        navigate("/addedpackage");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again.",
        });
      });
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  return (
    <Box className="add-packages-container">
      {/* Header Section */}
      <Box className="add-packages-header">
        <TravelExploreIcon className="header-icon" />
        <Typography variant="h3" className="header-title">
          Add a New Tour Package
        </Typography>
        <Typography variant="body1" className="header-subtitle">
          Enhance your tourism offerings by adding a package with ease!
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="form-container">
        <form id="tour-form" onSubmit={handleAdd}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget (in USD)"
                variant="outlined"
                fullWidth
                type="number"
                required
                InputProps={{
                  startAdornment: <AttachMoneyIcon />,
                }}
                onChange={(e) => setBudget(e.target.value)}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (e.g., 3 Days)"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  startAdornment: <TimerIcon />,
                }}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Highlights (comma-separated)"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  startAdornment: <LandscapeIcon />,
                }}
                onChange={(e) => setHighlights(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  startAdornment: <CollectionsIcon />,
                }}
                onChange={(e) => setImage(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
                fullWidth
              >
                Add Package
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                className="back-button"
                fullWidth
                onClick={handleBackToDashboard}
                startIcon={<ArrowBackIcon />}
              >
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddPackages;
