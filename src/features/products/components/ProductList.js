import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../../../services/productServices'; 
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import ConfirmationModal from '../../../components/ConfirmationModal';
import PaginationComponent from '../../../components/PaginationComponent';
import Swal from 'sweetalert2';
import UpdateProduct from './UpdateProduct';  

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [confirmationOpen, setConfirmationOpen] = useState(false); 
  const [productToDelete, setProductToDelete] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  const fetchProducts = async (page) => {
    try {
      const response = await getProducts(page);
      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = async () => {
    if (productToDelete !== null) {
      try {
        const response = await deleteProduct(productToDelete);

        if (response.message === 'Product deleted successfully') {
          await fetchProducts(page); 
          setConfirmationOpen(false);
          setProductToDelete(null);
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.error('Failed to delete product:', response.message);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
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

  const handleOpenUpdateModal = (id) => {
    const product = products.find(p => p.id === id);
    setProductToUpdate(product);
    setUpdateModalOpen(true);
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
      <Paper elevation={3} style={{ padding: '16px' }}>
        <ReusableTable
          headers={['ID', 'Title', 'Description', 'Price', 'Category', 'Image', 'Actions']}
          rows={products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category ? product.category.title : 'N/A',
            image: product.attachments && product.attachments.length > 0 ? (
              <img src={product.attachments[0].file_path} alt={product.title} style={{ width: '100px', height: 'auto' }} />
            ) : 'No Image',
            actions: (
              <>
                <button onClick={() => handleOpenUpdateModal(product.id)}>Update</button>
                <button onClick={() => handleOpenConfirmation(product.id)}>Delete</button>
              </>
            ),
          }))}
          onEdit={handleOpenUpdateModal}
          onDelete={handleOpenConfirmation}
        />
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
