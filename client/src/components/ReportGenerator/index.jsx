import React from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';

const ReportGeneratorUI = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Box
          borderRadius="10px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          padding="40px"
          bgcolor="white"
          maxWidth="400px"
          textAlign="center"
   > 
          <Box mt={3}>
         
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginRight:0    , margin:"4px", borderRadius: '20px' }}
            >Generate csv REPORT
            </Button>
          </Box>
  
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReportGeneratorUI;



