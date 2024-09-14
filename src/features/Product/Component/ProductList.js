import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ReusableTable from "components/ReusableTable";
import ConfirmationModal from "components/ConfirmationModal";
import PaginationComponent from "components/PaginationComponent";
import { Container, Paper, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [productToDelete, setProductToDelete] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const fetchProducts = async (page) => {
        try {
            const response = await axiosPrivate.get("/products", {
                params: {
                    page,
                    per_page: 10, 
                },
            });
            setProducts(response.data.data.data); 
            setMeta(response.data.data.meta); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (productToDelete !== null) {
                await axiosPrivate.delete(`/products/${productToDelete}`);
                fetchProducts(page); 
                setConfirmationOpen(false);
                setProductToDelete(null);
                Swal.fire('Deleted!', 'The product has been deleted.', 'success');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire('Error!', 'Could not delete the product.', 'error');
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchProducts(newPage);
    };

    const handleOpenConfirmation = (id) => {
        setProductToDelete(id);
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
        setProductToDelete(null);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axiosPrivate.get(`/products/${id}`);
            setSelectedProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h4" gutterBottom>
                    Products List
                </Typography>
                {products.length > 0 ? (
                    <ReusableTable
                        headers={["ID", "Title", "Description", "Price", "Attachments", "Actions"]}
                        rows={products.map((product) => ({
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            attachments: product.attachments.length
                                ? product.attachments.map((attachment) => (
                                    <img
                                        key={attachment.id}
                                        src={attachment.file_path}
                                        alt="Attachment"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                  ))
                                : "No Image",
                            actions: (
                                <div>
                                    <IconButton
                                        onClick={() => handleUpdate(product.id)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpenConfirmation(product.id)}
                                        color="secondary"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ),
                        }))}
                    />
                ) : (
                    <Typography>No products found.</Typography>
                )}

                <PaginationComponent meta={meta} onPageChange={handlePageChange} />

                <ConfirmationModal
                    open={confirmationOpen}
                    onClose={handleCloseConfirmation}
                    onConfirm={handleDelete}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this product?"
                />
            </Paper>
        </Container>
    );
};

export default ProductList;
