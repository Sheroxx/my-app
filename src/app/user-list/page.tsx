import UserList from "@/app/components/UserList";
import ProductList from "../components/ProductList";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";

export default function UserListPage() {
  return (
    <div >
      <Box maxWidth={'lg'} margin={'auto'}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ mr: 1 }} />
          User List
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Drag a column header here to group by that column
        </Typography>
      </Box>
      <Box>
        <UserList />
      </Box>
      <Box sx={{ mt: 15 }}>
        <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Product List
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Drag a column header here to group by that column
        </Typography>
      </Box>
      <Box>
        <ProductList />
      </Box>
      </Box>
    </div>
  );
}
