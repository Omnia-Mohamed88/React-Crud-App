// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import ReusableCard from '../components/ReusableCard';
import { getCategories } from '../services/categoryServices';
import { Container, Grid } from '@mui/material';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Fetched data:', response);
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {Array.isArray(categories) && categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <ReusableCard
              title={category.title}
              image={category.attachments.length > 0 ? category.attachments[0].file_path : null}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
