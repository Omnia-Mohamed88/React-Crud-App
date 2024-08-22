import React, { useEffect, useState } from 'react';
import { getProducts } from 'services/productServices'; 
import ReusableCard from 'components/ReusableCard'; 
import PaginationComponent from 'components/PaginationComponent';
import { Container, Grid, TextField, Button, Paper } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchProducts = async (page = 1, searchTerm = '') => {
    try {
      const response = await getProducts(page, searchTerm);
      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(page, searchTerm);
  }, [page, searchTerm]);

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1); 
    fetchProducts(1, searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
    setPage(1); 
    fetchProducts(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (isSearching) {
      fetchProducts(newPage, searchTerm);
    } else {
      fetchProducts(newPage);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ReusableCard
              title={product.title}
              description={product.description}
              image={product.image}
            />
          </Grid>
        ))}
      </Grid>
      
      <PaginationComponent
        meta={meta}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Home;
