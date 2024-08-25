import React, { useEffect, useState } from 'react';
import { getProducts } from 'services/productServices'; 
import { getCategories } from 'services/categoryServices'; 
import ReusableCard from 'components/ReusableCard'; 
import PaginationComponent from 'components/PaginationComponent';
import { Container, Grid, TextField, Button, Paper, Select, MenuItem } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchCategories(); 
    fetchProducts(page, searchTerm, categoryId);
  }, [page, searchTerm, categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (page = 1, searchTerm = '', categoryId = '') => {
    try {
      const response = await getProducts(page, searchTerm, categoryId);
      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1); 
    fetchProducts(1, searchTerm, categoryId);
  };

  const handleClear = () => {
    setSearchTerm('');
    setCategoryId('');
    setIsSearching(false);
    setPage(1); 
    fetchProducts(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProducts(newPage, searchTerm, categoryId);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4} container spacing={1}>
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
