"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loginSchema } from "../utils/validationSchema";

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          expiresInMins: 30,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      Cookies.set("email", result.email, { expires: 1 });
      Cookies.set("username", result.username, { expires: 1 });
      Cookies.set("token", result.token, { expires: 1 });

      router.push("/user-list");
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
