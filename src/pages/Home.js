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
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <ReusableCard
              title={category.title}
              description={category.description}
              onEdit={() => console.log(`Edit ${category.id}`)}
              onDelete={() => console.log(`Delete ${category.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
