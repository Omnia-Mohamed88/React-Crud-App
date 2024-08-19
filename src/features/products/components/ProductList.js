import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../services/productServices'; 
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import ConfirmationModal from '../../../components/ConfirmationModal';
import PaginationComponent from '../../../components/PaginationComponent';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [confirmationOpen, setConfirmationOpen] = useState(false); 
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async (page) => {
    try {
      console.log('Fetching products for page:', page);
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
        console.log(`Attempting to delete product with ID: ${productToDelete}`);
        const response = await deleteProduct(productToDelete);
        console.log('Delete response:', response);

        if (response.message === 'Product deleted successfully') {
          await fetchProducts(page); 
          setConfirmationOpen(false);
          setProductToDelete(null);
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
              <button onClick={() => handleOpenConfirmation(product.id)}>Delete</button>
            ),
          }))}
          onDelete={handleOpenConfirmation}
        />
        <ConfirmationModal
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
        />
        <PaginationComponent meta={meta} onPageChange={handlePageChange} />
      </Paper>
    </Container>
  );
};

export default ProductList;
