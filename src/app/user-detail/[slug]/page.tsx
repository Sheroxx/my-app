"use client";
import React from "react";
import UserDetailForm from "@/app/components/UserDetailFrom";
import EditableProductList from "@/app/components/EditableProductList";
import { useParams } from "next/navigation";
import { Container, Grid, Typography } from "@mui/material";

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.slug;

  if (!id) return <p>Loading...</p>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            User Detail
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UserDetailForm userId={id as string} />
        </Grid>
        <Grid item xs={12}>
          <EditableProductList userId={id as string} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetailPage;
