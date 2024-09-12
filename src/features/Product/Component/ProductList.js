import { useEffect, useState } from "react";
import { Container, Paper, CircularProgress, Typography } from "@mui/material";
import ConfirmationModal from "components/ConfirmationModal";
import PaginationComponent from "components/PaginationComponent";
import Swal from "sweetalert2";
import UpdateProduct from "features/Product/Component/UpdateProduct";
import axiosPrivate from "hooks/useAxiosPrivate";
import ReusableTable from "components/ReusableTable";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(`/products?page=${page}`);
      setProducts(response.data.data);
      setMeta(response.data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/products/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await axiosPrivate.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = async () => {
    if (productToDelete !== null) {
      try {
        const response = await deleteProduct(productToDelete);

        if (response.status === 200) {
          await fetchProducts(page);
          setConfirmationOpen(false);
          setProductToDelete(null);

          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error(
            "Failed to delete product:",
            response.data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  const handleOpenConfirmation = (id) => {
    setProductToDelete(id);
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setProductToDelete(null);
  };

  const handleOpenUpdateModal = async (id) => {
    try {
      const product = await getProduct(id);
      setProductToUpdate({
        ...product,
        attachments: product.attachments,
      });
      setUpdateModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setProductToUpdate(null);
  };

  const handleUpdateSuccess = async () => {
    await fetchProducts(page);
    handleCloseUpdateModal();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: "16px" }}>
        {loading ? (
          <CircularProgress />
        ) : products.length === 0 ? (
          <Typography variant="h6">No products available</Typography>
        ) : (
          <ReusableTable
            headers={[
              "ID",
              "Title",
              "Description",
              "Price",
              "Category",
              "Attachments",
              "Actions",
            ]}
            rows={products.map((product) => ({
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              category: product.category.title,
              attachments: product.attachments.map((attachment) => (
                <img
                  key={attachment.id}
                  src={attachment.file_path}
                  alt={`Attachment ${attachment.id}`}
                  style={{ width: "50px", height: "50px" }}
                />
              )),
            }))}
            onEdit={handleOpenUpdateModal}
            onDelete={handleOpenConfirmation}
          />
        )}
        <ConfirmationModal
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
        />
        <UpdateProduct
          open={updateModalOpen}
          onClose={handleCloseUpdateModal}
          product={productToUpdate}
          onUpdate={handleUpdateSuccess}
        />
        <PaginationComponent meta={meta} onPageChange={handlePageChange} />
      </Paper>
    </Container>
  );
};

export default ProductList;
