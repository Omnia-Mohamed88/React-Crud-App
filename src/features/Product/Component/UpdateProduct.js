import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import UpdateProductForm from "features/Product/forms/UpdateProductForm";

const ProductUpdate = ({ productId, onClose }) => {
    const axiosPrivate = useAxiosPrivate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosPrivate.get(`/products/${productId}`);
                setProduct(response.data.data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axiosPrivate.get('/categories');
                setCategories(response.data.data.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [productId, axiosPrivate]);

    const handleUpdateProduct = async (values) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (Array.isArray(values[key])) {
                    values[key].forEach(item => {
                        formData.append(`${key}[]`, item);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });

            const payload = {
                title: values.title,
                description: values.description,
                price: values.price,
                category_id: values.category_id,
                attachments: {
                    create: values.attachments.create || [],
                    delete: values.attachments.delete || []
                }
            };

            console.log('Payload:', payload);

            await axiosPrivate.put(`/products/${productId}`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                setServerErrors(error.response.data.errors);
            } else {
                setServerErrors({ general: 'Failed to update product. Please try again.' });
            }
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    margin: 'auto',
                    marginTop: '5%',
                    position: 'relative',
                }}
            >
                {product && (
                    <UpdateProductForm
                        product={product}
                        categories={categories}
                        onSubmit={handleUpdateProduct}
                        serverErrors={serverErrors}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default ProductUpdate;
