import { useState, useEffect } from "react";
import { TextField, Button, Grid, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import { updateCategorySchema } from "features/Category/Schemas/updateCategorySchema";
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const UpdateCategoryForm = ({ category, onSubmit, serverErrors }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (category) {
            setUploadedImages(category.attachments || []);
        }
    }, [category]);

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
    
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach((file, index) => formData.append(`files[${index}]`, file));
    
        try {
            const response = await axiosPrivate.post('/attachments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            const uploadedImagesUrls = response.data.data.urls;
            setSelectedFiles(prev => [...prev, ...uploadedImagesUrls]);
        } catch (error) {
            console.error("Failed to upload images:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: category?.title || "",
            attachments: {
                create: [],
                delete: []
            }
        },
        validationSchema: updateCategorySchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const payload = {
                title: values.title,
                attachments: {
                    create: selectedFiles.map(file => ({ file_path: file })),
                    delete: imagesToDelete
                }
            };
            console.log(payload);

            try {
                await onSubmit(payload);
            } catch (error) {
                console.error("Failed to update category:", error);
            }
        },
    });
    const handleFileChange = (event) => {
        handleImageUpload(event);
    };

    const handleDeleteNewImage = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, idx) => idx !== index));
    };

    const handleDeleteUploadedImage = (img) => {
        setUploadedImages(prev => prev.filter(image => image.file_path !== img.file_path));
        setImagesToDelete(prev => [...prev, img.id]);
    };

    return (
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            name="title"
                            fullWidth
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
    <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-images"
    />
    <label htmlFor="upload-images">
        <Button variant="contained" component="span">
            Upload Images
        </Button>
    </label>

    {selectedFiles.length > 0 && (
        <div>
            {selectedFiles.map((file, index) => (
                <div
                    key={index}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        marginRight: '10px',
                    }}
                >
                    <img
                        src={file}
                        alt="New upload"
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <IconButton onClick={() => window.open(file, '_blank')}>
                            <VisibilityIcon />
                        </IconButton>

                        <IconButton
                            onClick={() => handleDeleteNewImage(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    )}
</Grid>

                    <Grid item xs={12}>
                        <div>
                            {uploadedImages.map((img, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <img
                                        src={img.file_path}
                                        alt="Uploaded"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <div style={{  display: 'flex', justifyContent: 'center', width: '100%' }}>
                                        <IconButton onClick={() => window.open(img.file_path, "_blank")}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteUploadedImage(img)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Update Category
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

UpdateCategoryForm.propTypes = {
    category: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    serverErrors: PropTypes.object,
};

UpdateCategoryForm.defaultProps = {
    category: null,
    serverErrors: {},
};

export default UpdateCategoryForm;
