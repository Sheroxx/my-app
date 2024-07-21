"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Avatar, Chip } from "@mui/material";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

const columns: GridColDef[] = [
  {
    field: "thumbnail",
    headerName: "Image",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <Avatar src={params.value} variant="square" />
    ),
  },
  { field: "title", headerName: "Title", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      `$ ${params.value.toFixed(2)}`,
  },
  { field: "quantity", headerName: "Quantity", width: 150 },
  {
    field: "total",
    headerName: "Total",
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      `$ ${params.value.toFixed(2)}`,
  },
  {
    field: "discountPercentage",
    headerName: "Discount",
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={`% ${params.value.toFixed(2)}`}
        color={params.value > 10 ? "success" : "warning"}
      />
    ),
  },
  {
    field: "discountedPrice",
    headerName: "Discounted Total",
    width: 200,
    renderCell: (params: GridRenderCellParams) =>
      `$ ${params.value.toFixed(2)}`,
  },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = data.products.map((product: any) => ({
          ...product,
          quantity: product.stock,
          total: product.price * product.stock,
          discountedPrice:
            product.price * (1 - product.discountPercentage / 100),
        }));
        setProducts(updatedProducts);
      });
  }, []);

  return (
    <Box sx={{ height: 600, width: "100%", marginBottom: 2 }}>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </Box>
  );
};

export default ProductList;
