import React, { useState } from 'react';
import { Button, FormControl, Select, InputLabel, MenuItem, TextField, Checkbox, FormGroup, FormControlLabel, Typography, Card, CardContent, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faHiking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CustomizeTour.css';
import PackageDetails from './PackageDetails.js';

const CustomizeTour = ({ tour = {} }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    destinations: [],
    hotels: '',
    guides: '',
    transport: '',
    mealPlan: '',
    activities: [],
    specialRequests: '',
  });

  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSelectedOptions({
        ...selectedOptions,
        [name]: checked,
      });
    } else if (type === 'select-multiple') {
      setSelectedOptions({
        ...selectedOptions,
        [name]: value,
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [name]: value,
      });
    }
  };

  const handleMealSelect = (meal) => {
    setSelectedOptions({
      ...selectedOptions,
      mealPlan: meal,
    });
  };

  const handleActivitySelect = (activity) => {
    setSelectedOptions({
      ...selectedOptions,
      activities: selectedOptions.activities.includes(activity)
        ? selectedOptions.activities.filter((item) => item !== activity)
        : [...selectedOptions.activities, activity],
    });
  };

  const handleConfirm = () => {
    // Store selected options in localStorage
    localStorage.setItem('customizedPackage', JSON.stringify(selectedOptions));
    // Navigate to the ViewCustomizedPackage page
    navigate('/view-customized-package');
  };

  return (
    <div className="customize-tour-container">
      <Typography variant="h4" className="title" gutterBottom>
        Customize Your Tour Package: {tour.name}
      </Typography>

      <PackageDetails />

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Meal Plans <FontAwesomeIcon icon={faUtensils} />
          </Typography>
          <Divider />
          {["Vegetarian", "Vegan", "Local Cuisine", "Seafood", "Buffet"].map((meal) => (
            <Button
              key={meal}
              variant={selectedOptions.mealPlan === meal ? "contained" : "outlined"}
              onClick={() => handleMealSelect(meal)}
            >
              {meal}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Add-Ons <FontAwesomeIcon icon={faHiking} />
          </Typography>
          <Divider />
          {["Hiking", "Safari", "Cultural Experience", "Wildlife Watching"].map((activity) => (
            <FormControlLabel
              key={activity}
              control={
                <Checkbox
                  checked={selectedOptions.activities.includes(activity)}
                  onChange={() => handleActivitySelect(activity)}
                />
              }
              label={activity}
            />
          ))}
        </CardContent>
      </Card>

      <FormControl fullWidth margin="normal">
        <InputLabel>Optional Destinations</InputLabel>
        <Select
          name="destinations"
          multiple
          value={selectedOptions.destinations}
          onChange={handleOptionChange}
          label="Optional Destinations"
        >
          {["Town A", "Town B", "Attraction 1", "Attraction 2"].map((destination) => (
            <MenuItem key={destination} value={destination}>
              {destination}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Transportation Mode</InputLabel>
        <Select
          name="transport"
          value={selectedOptions.transport}
          onChange={handleOptionChange}
        >
          {["Private Car", "Train", "Bus", "Plane"].map((mode) => (
            <MenuItem key={mode} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Hotel Selection</InputLabel>
        <Select
          name="hotels"
          value={selectedOptions.hotels}
          onChange={handleOptionChange}
        >
          {["3-Star", "4-Star", "5-Star"].map((hotel) => (
            <MenuItem key={hotel} value={hotel}>
              {hotel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Guide Selection</InputLabel>
        <Select
          name="guides"
          value={selectedOptions.guides}
          onChange={handleOptionChange}
        >
          {["English-speaking", "Spanish-speaking", "Expert in History"].map((guide) => (
            <MenuItem key={guide} value={guide}>
              {guide}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="specialRequests"
        label="Special Requests"
        value={selectedOptions.specialRequests}
        onChange={handleOptionChange}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        style={{ marginTop: '20px' }}
      >
        Book Package
      </Button>
    </div>
  );
};

export default CustomizeTour;
