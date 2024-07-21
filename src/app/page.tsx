import React from "react";
import Link from "next/link";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to the Test Case Project
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center">
          Choose an option below to continue
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Link href="/login" passHref>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
