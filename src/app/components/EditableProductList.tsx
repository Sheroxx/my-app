'use client';
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Container,
  Box,
  Avatar,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
} from '@mui/material';

interface EditableProductListProps {
  userId: string;
}

const EditableProductList: React.FC<EditableProductListProps> = ({
  userId,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.products) {
          const updatedProducts = data.products.map((product: any) => ({
            ...product,
            total: product.price * product.stock,
            discountedPrice:
              product.price * (1 - product.discountPercentage / 100),
          }));
          setProducts(updatedProducts);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [userId]);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      });
  };

  const handleSave = () => {
    fetch(`https://dummyjson.com/products/${selectedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedProducts = products.map((product) =>
          product.id === data.id
            ? {
                ...data,
                total: data.price * data.stock,
                discountedPrice:
                  data.price * (1 - data.discountPercentage / 100),
              }
            : product
        );
        setProducts(updatedProducts);
        setOpen(false);
      });
  };

  const handleAdd = () => {
    const newProduct = {
      title: 'New Product',
      price: 0,
      quantity: 0,
      total: 0,
      discountPercentage: 0,
      discountedPrice: 0,
    };
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'thumbnail',
      headerName: 'Image',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar src={params?.value} variant="square" />
      ),
    },
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      renderCell: (params: GridRenderCellParams) =>
        `$ ${typeof params.value === 'number' ? params.value.toFixed(2) : params.value}`,
      editable: true,
    },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      renderCell: (params: GridRenderCellParams) =>
        `$ ${typeof params.value === 'number' ? params.value.toFixed(2) : params.value}`,
      editable: true,
    },
    {
      field: 'discountPercentage',
      headerName: 'Discount',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={`% ${typeof params.value === 'number' ? params.value.toFixed(2) : params.value}`}
          color={params?.value > 10 ? 'success' : 'warning'}
        />
      ),
      editable: true,
    },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Total',
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        `$ ${typeof params.value === 'number' ? params.value.toFixed(2) : params.value}`,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </Box>
      <Box sx={{ height: 600, width: '100%', mb: 2 }}>
        <DataGrid
          rows={products}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                value={selectedProduct?.title || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    title: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                fullWidth
                value={selectedProduct?.quantity || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Discount Percentage"
                type="number"
                fullWidth
                value={selectedProduct?.discountPercentage || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    discountPercentage: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditableProductList;
