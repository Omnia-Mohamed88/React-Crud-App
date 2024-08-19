import React from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../../services/categoryServices'; 
import Update from '../components/Update';

const UpdateCategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id); 
        setCategory(data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Category</h1>
      <Update category={category} />
    </div>
  );
};

export default UpdateCategoryPage;
