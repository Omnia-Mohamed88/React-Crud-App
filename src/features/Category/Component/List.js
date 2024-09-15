import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ReusableTable from "components/ReusableTable";
import ConfirmationModal from "components/ConfirmationModal";
import PaginationComponent from "components/PaginationComponent";
import { Container, Paper, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryUpdate from "features/Category/Component/Update";
import Swal from 'sweetalert2';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const axiosPrivate = useAxiosPrivate();

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

    const handleDelete = async () => {
        try {
            if (categoryToDelete !== null) {
                await axiosPrivate.delete(`/categories/${categoryToDelete}`);
                fetchCategories(page);
                setConfirmationOpen(false);
                setCategoryToDelete(null);
                Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            Swal.fire('Error!', 'Could not delete the category.', 'error');
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchCategories(newPage);
    };

    const handleOpenConfirmation = (id) => {
        setCategoryToDelete(id);
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
        setCategoryToDelete(null);
    };

    const handleOpenUpdate = (id) => {
        setCurrentCategoryId(id);
        setUpdateOpen(true);
    };

    const handleCloseUpdate = () => {
        setUpdateOpen(false);
        setCurrentCategoryId(null);
        fetchCategories(page); // Refresh the list after updating
    };

    useEffect(() => {
        fetchCategories(page);
    }, [page]);

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h4" gutterBottom>
                    Categories List
                </Typography>
                {categories.length > 0 ? (
                    <ReusableTable
                        headers={["ID", "Title", "Image", "Actions"]}
                        rows={categories.map((category) => ({
                            id: category.id,
                            title: category.title,
                            Image: category.attachments.length ? (
                                <img
                                    src={category.attachments[0].file_path}
                                    alt="Category"
                                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                                />
                            ) : (
                                "No Image"
                            ),
                            Actions: (
                                <div>
                                    <IconButton
                                        onClick={() => handleOpenUpdate(category.id)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpenConfirmation(category.id)}
                                        color="secondary"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ),
                        }))}
                    />
                ) : (
                    <Typography>No categories found.</Typography>
                )}

                <PaginationComponent meta={meta} onPageChange={handlePageChange} />

                <ConfirmationModal
                    open={confirmationOpen}
                    onClose={handleCloseConfirmation}
                    onConfirm={handleDelete}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this category?"
                />

                {updateOpen && currentCategoryId && (
                    <CategoryUpdate
                        categoryId={currentCategoryId}
                        onClose={handleCloseUpdate}
                        onUpdate={fetchCategories}
                    />
                )}
            </Paper>
        </Container>
    );
};

export default CategoryList;
