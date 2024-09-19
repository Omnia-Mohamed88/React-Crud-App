import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import UpdateCategoryForm from "features/Category/Form/Update";
import PropTypes from "prop-types";

const CategoryUpdate = ({ categoryId, onClose }) => {
    const axiosPrivate = useAxiosPrivate();
    const [category, setCategory] = useState(null);
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosPrivate.get(`/categories/${categoryId}`);
                setCategory(response.data.data.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [categoryId, axiosPrivate]);

    const handleUpdateCategory = async (values) => {
        try {
            const payload = {
                title: values.title,
                attachments: {
                    create: values.attachments.create || [],
                    delete: values.attachments.delete || []
                }
            };

            await axiosPrivate.put(`/categories/${categoryId}`, values, {
            });
            onClose();
        } catch (error) {
            console.error("Error updating category:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                setServerErrors(error.response.data.errors);
            } else {
                setServerErrors({ general: 'Failed to update category. Please try again.' });
            }
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    maxWidth: "600px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    margin: "auto",
                    marginTop: "5%",
                    position: "relative",
                }}
            >
                {category && (
                    <UpdateCategoryForm
                        category={category}
                        onSubmit={handleUpdateCategory}
                        serverErrors={serverErrors}
                    />
                )}
            </Box>
        </Modal>
    );
};

CategoryUpdate.propTypes = {
    categoryId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CategoryUpdate;
