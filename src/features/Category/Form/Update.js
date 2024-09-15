import { useState, useEffect } from "react";
import { TextField, Button, Grid, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import { updateCategorySchema } from "features/Category/Schemas/updateCategorySchema"; 

const UpdateCategoryForm = ({ category, onSubmit, serverErrors }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    useEffect(() => {
        if (category) {
            setUploadedImages(category.attachments || []);
        }
    }, [category]);

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
                    create: selectedFiles.map(file => ({
                        file_path: URL.createObjectURL(file), 
                        original_name: file.name 
                    })),
                    delete: imagesToDelete
                }
            };

            console.log('Payload:', payload);

            try {
                await onSubmit(payload);
            } catch (error) {
                console.error("Failed to update category:", error);
            }
        },
    });

    const handleFileChange = (event) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
    };

    const handleDeleteNewImage = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
    };

    const handleDeleteUploadedImage = (img) => {
        setUploadedImages((prev) => prev.filter((image) => image.file_path !== img.file_path));
        setImagesToDelete((prev) => [...prev, img.id]); 
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
                                    <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ width: 100, height: 100, objectFit: 'cover' }}
                                        />
                                        <IconButton
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={() => handleDeleteNewImage(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
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
                                        alt="Attachment"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
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
