import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewCustomizedPackage = () => {
  const [customizedPackage, setCustomizedPackage] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPackage = JSON.parse(localStorage.getItem('customizedPackage'));
    if (storedPackage) {
      setCustomizedPackage(storedPackage);
    }

    // Simulating fetching package details (Ideally, fetch from API)
    const fetchedPackageDetails = {
      name: "Galle Fort",
      budget: "$150",
      duration: "1 Day",
      highlights: ["Dutch Reformed Church", "Lighthouse", "Fort Walls"],
    };

    setPackageDetails(fetchedPackageDetails);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card variant="outlined" style={{ maxWidth: '600px', width: '100%', padding: '20px', background: '#f9f9f9' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Customized Tour Budget Report
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />

          {/* Package Overview */}
          {packageDetails && (
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Destination</strong></TableCell>
                    <TableCell>{packageDetails.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Duration</strong></TableCell>
                    <TableCell>{packageDetails.duration}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Base Budget</strong></TableCell>
                    <TableCell>{packageDetails.budget}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Highlights</strong></TableCell>
                    <TableCell>{packageDetails.highlights.join(", ")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Customized Selections */}
          {customizedPackage ? (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Meal Plan</strong></TableCell>
                    <TableCell>{customizedPackage.mealPlan || "Not Selected"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Activities</strong></TableCell>
                    <TableCell>{customizedPackage.activities.length > 0 ? customizedPackage.activities.join(", ") : "No activities selected"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Transportation</strong></TableCell>
                    <TableCell>{customizedPackage.transport || "Not Selected"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Hotel</strong></TableCell>
                    <TableCell>{customizedPackage.hotels || "Not Selected"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Guide</strong></TableCell>
                    <TableCell>{customizedPackage.guides || "Not Selected"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Special Requests</strong></TableCell>
                    <TableCell>{customizedPackage.specialRequests || "None"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="textSecondary">
              No package selected
            </Typography>
          )}

          {/* Total Budget Section */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="h5" color="primary">
              Total Budget: {packageDetails ? packageDetails.budget : "Not Calculated"}
            </Typography>
          </div>

          {/* Back Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCustomizedPackage;
