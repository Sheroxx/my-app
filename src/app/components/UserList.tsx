"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

interface User {
  id: number;
  image: string;
  username: string;
  phone: string;
  email: string;
}

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Avatar",
    width: 70,
    renderCell: (params) => (
      <Avatar src={params.value} alt={params.row.username} />
    ),
  },
  { field: "username", headerName: "Username", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <IconButton href={`/user-detail/${params.row.id}`} color="primary">
        <EditIcon />
      </IconButton>
    ),
  },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
      });
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  return (
    <Box sx={{ height: 600, width: "100%", marginBottom: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2, width: "100%" }}
      />
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </Box>
  );
};

export default UserList;
