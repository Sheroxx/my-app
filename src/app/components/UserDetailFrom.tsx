"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface UserDetailFormProps {
  userId: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

const UserDetailForm: React.FC<UserDetailFormProps> = ({ userId }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        reset(data);
      });
  }, [userId, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    fetch(`https://dummyjson.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated:", data);
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.username}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="First Name" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="Last Name" {...field} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="Email" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="Phone" {...field} />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserDetailForm;
