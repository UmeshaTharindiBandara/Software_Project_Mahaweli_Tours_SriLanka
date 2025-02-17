import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PackageDetails from './PackageDetails'; // Import PackageDetails component

const ViewCustomizedPackage = () => {
  const [customizedPackage, setCustomizedPackage] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPackage = JSON.parse(localStorage.getItem('customizedPackage'));
    if (storedPackage) {
      setCustomizedPackage(storedPackage);
    }

    // Simulating fetching package details (This should ideally come from an API or state)
    const fetchedPackageDetails = {
      name: "Galle Fort",
      budget: "$150",
      duration: "1 Day",
      highlights: ["Dutch Reformed Church", "Lighthouse", "Fort Walls"],
    };

    setPackageDetails(fetchedPackageDetails);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Customized Tour Package
      </Typography>

      {/* Package Details Section */}
      {packageDetails && (
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">{packageDetails.name}</Typography>
            <Typography variant="h6">Budget: {packageDetails.budget}</Typography>
            <Typography variant="h6">Duration: {packageDetails.duration}</Typography>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Highlights:</Typography>
            <List>
              {packageDetails.highlights.map((highlight, index) => (
                <ListItem key={index}>
                  <ListItemText primary={highlight} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Customized Selections Section */}
      {customizedPackage ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Meal Plan:</Typography>
            <Typography>{customizedPackage.mealPlan || "Not Selected"}</Typography>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Activities:</Typography>
            <List>
              {customizedPackage.activities.length > 0 ? (
                customizedPackage.activities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))
              ) : (
                <Typography>No activities selected</Typography>
              )}
            </List>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Transportation:</Typography>
            <Typography>{customizedPackage.transport || "Not Selected"}</Typography>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Hotel:</Typography>
            <Typography>{customizedPackage.hotels || "Not Selected"}</Typography>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Guide:</Typography>
            <Typography>{customizedPackage.guides || "Not Selected"}</Typography>

            <Divider style={{ margin: '10px 0' }} />

            <Typography variant="h6">Special Requests:</Typography>
            <Typography>{customizedPackage.specialRequests || "None"}</Typography>

            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography>No package selected</Typography>
      )}
    </div>
  );
};

export default ViewCustomizedPackage;
