import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ReusableTable from "components/ReusableTable";
import { Container, Paper, IconButton, Grid } from "@mui/material";
import Update from "./Update";
import ConfirmationModal from "components/ConfirmationModal";
import PaginationComponent from "components/PaginationComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const List = () => {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async (page) => {
    try {
      const response = await axiosPrivate.get("/categories", {
        params: {
          page,
          per_page: 10,
        },
      });
      setCategories(response.data.data.data);
      setMeta(response.data.data.meta);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const handleCategoryUpdate = async () => {
    await fetchCategories(page);
    handleCloseUpdateModal();
  };

  const handleDelete = async () => {
    try {
      if (categoryToDelete !== null) {
        await axiosPrivate.delete(`/categories/${categoryToDelete}`);
        fetchCategories(page);
        setConfirmationOpen(false);
        setCategoryToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axiosPrivate.get(`/categories/${id}`);
      setSelectedCategory(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleCloseUpdateModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleOpenConfirmation = (id) => {
    setCategoryToDelete(id);
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const rows = categories?.map((category) => ({
    id: category.id,
    title: category.title,
    Images: category.attachments.length ? (
      <Grid container spacing={1}>
        {category.attachments.map((attachment, index) => (
          <Grid item key={index}>
            <img
              src={attachment.file_path}
              alt={`Attachment ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      "No Images"
    ),
    Actions: (
      <>
        <IconButton onClick={() => handleUpdate(category.id)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleOpenConfirmation(category.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }));

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: "16px" }}>
        <ReusableTable
          headers={["ID", "Title", "Images", "Actions"]}
          rows={rows}
        />

        {modalOpen && selectedCategory && (
          <Update
            open={modalOpen}
            onClose={handleCloseUpdateModal}
            category={selectedCategory}
            onUpdate={handleCategoryUpdate}
          />
        )}

        <ConfirmationModal
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this category?"
        />

        <PaginationComponent meta={meta} onPageChange={handlePageChange} />
      </Paper>
    </Container>
  );
};

export default List;
