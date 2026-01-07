import Sidebar from "../../Component/Sidebar";
import { FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const ProductAdd = () => {

    const [categories, setCategories] = useState(["Electronics", "Condoms", "Lubricants"]);
    const [newCategory, setNewCategory] = useState("");

    const fileRef = useRef(null);

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [product, setProduct] = useState({
        title: "",
        description: "",
        sku: "",
        price: "",
        oldPrice: "",
        stock: "",
        brand: "",
        category: "",
        vendor: "Official Store",
        tags: "",
        gender: "",
        usageType: "",
        suitable: "",              // ✅ FIXED
        status: true,
        availability: "Online Store",
        publishDate: "",
        freeLube: false,
        howToUse: [""],
    });

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    /* IMAGE PREVIEW */
    useEffect(() => {
        const previews = images.map(img => URL.createObjectURL(img));
        setImagePreviews(previews);

        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [images]);

    /* HOW TO USE */
    const handleHowToChange = (index, value) => {
        const steps = [...product.howToUse];
        steps[index] = value;
        setProduct({ ...product, howToUse: steps });
    };

    const addHowToStep = () => {
        setProduct({ ...product, howToUse: [...product.howToUse, ""] });
    };

    const removeHowToStep = (index) => {
        const steps = product.howToUse.filter((_, i) => i !== index);
        setProduct({ ...product, howToUse: steps });
    };

    /* ---------------- SAVE PRODUCT ---------------- */

    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append("title", product.title);
            formData.append("description", product.description);
            formData.append("sku", product.sku);
            formData.append("price", Number(product.price));
            formData.append("oldPrice", Number(product.oldPrice));
            formData.append("stock", Number(product.stock));
            formData.append("brand", product.brand);
            formData.append("category", product.category);
            formData.append("vendor", product.vendor);
            formData.append("gender", product.gender);
            formData.append("usageType", product.usageType);
            formData.append("suitable", product.suitable);
            formData.append("status", product.status);
            formData.append("availability", product.availability);
            formData.append("publishDate", product.publishDate);
            formData.append("freeLube", product.freeLube);

            formData.append("howToUse", JSON.stringify(product.howToUse));
            formData.append(
                "tags",
                JSON.stringify(product.tags.split(",").map(t => t.trim()))
            );

            images.forEach(img => formData.append("images", img));

            const token = localStorage.getItem("adminToken");

            await axios.post("https://toy-backend-fsek.onrender.com/products", formData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                     "Content-Type": "multipart/form-data",
                },
            });

            alert("✅ Product saved successfully");

            setProduct({
                title: "",
                description: "",
                sku: "",
                price: "",
                oldPrice: "",
                stock: "",
                brand: "",
                category: "",
                vendor: "Official Store",
                tags: "",
                gender: "",
                usageType: "",
                suitable: "",
                status: true,
                availability: "Online Store",
                publishDate: "",
                freeLube: false,
                howToUse: [""],
            });

            setImages([]);
            setImagePreviews([]);
            fileRef.current.value = "";

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "❌ Failed to save product");
        }
    };

    return (
        <div className="admin d-flex">
            <Sidebar />

            <div className="admin-content p-4 fade-in">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Add New Product</h2>
                    <div className="d-flex gap-2">
                        <button className="btn btn-light">Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save Product
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    {/* LEFT SIDE */}
                    <div className="col-lg-8">
                        {/* BASIC INFO */}
                        <div className="card dashboard-card mb-4">
                            <div className="card-body">
                                <h5>Basic Information</h5>
                                <label className="form-label mt-3">Product Title</label>
                                <input
                                    className="form-control"
                                    name="title"
                                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                                    value={product.title}
                                    onChange={handleChange}
                                />

                                <label className="form-label mt-3">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    placeholder="Describe your product here..."
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* HOW TO USE */}
                        <div className="card dashboard-card mb-4">
                            <div className="card-body">
                                <h5>How to Use</h5>
                                {product.howToUse.map((step, index) => (
                                    <div key={index} className="d-flex gap-2 mt-3">
                                        <input
                                            className="form-control"
                                            placeholder={`Step ${index + 1}`}
                                            value={step}
                                            onChange={(e) => handleHowToChange(index, e.target.value)}
                                        />
                                        {product.howToUse.length > 1 && (
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => removeHowToStep(index)}
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button className="btn btn-outline-primary mt-3" onClick={addHowToStep}>
                                    <FaPlus /> Add Step
                                </button>
                            </div>
                        </div>

                        {/* MEDIA */}
                        <div className="card dashboard-card mb-4">
                            <div className="card-body text-center upload-box">
                                <label
                                    htmlFor="fileUpload"
                                    className="d-flex flex-column align-items-center justify-content-center"
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaUpload size={26} className="text-primary mb-2" />
                                    <p className="mb-1">Click to upload or drag and drop</p>
                                    <small className="text-muted">
                                        SVG, PNG, JPG or GIF (max. 800×400px)
                                    </small>
                                </label>

                                <input
                                    id="fileUpload"
                                    type="file"
                                    className="d-none"
                                    multiple
                                    ref={fileRef}
                                    onChange={handleImages}
                                />

                                {/* IMAGE PREVIEW */}
                                <div className="image-preview-list mt-3">
                                    {imagePreviews.map((url, index) => (
                                        <div
                                            key={index}
                                            className={`image-preview-item ${index === 0 ? "thumbnail" : ""}`}
                                        >
                                            <button
                                                className="remove-btn"
                                                onClick={() => {
                                                    const newImages = images.filter((_, i) => i !== index);
                                                    setImages(newImages);
                                                }}
                                            >
                                                ×
                                            </button>
                                            <img src={url} alt={`preview-${index}`} />
                                            {index === 0 && <span className="thumbnail-label">Thumbnail</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* PRICING & INVENTORY */}
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5>Pricing & Inventory</h5>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Price</label>
                                        <input
                                            className="form-control"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Old price</label>
                                        <input
                                            className="form-control"
                                            name="oldPrice"
                                            value={product.oldPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">SKU</label>
                                        <input
                                            className="form-control"
                                            name="sku"
                                            placeholder="DUREX-THIN-001"
                                            value={product.sku}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Stock Quantity</label>
                                        <input
                                            className="form-control"
                                            name="stock"
                                            value={product.stock}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Brand</label>
                                        <input
                                            className="form-control"
                                            name="brand"
                                            placeholder="DUREX"
                                            value={product.brand}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                        <input
                                            className="form-control"
                                            name="gender"
                                            value={product.gender}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Usage Type</label>
                                        <input
                                            className="form-control"
                                            name="usageType"
                                            placeholder="Internal"
                                            value={product.usageType}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Suitable For</label>
                                        <input
                                            className="form-control"
                                            name="suitable"
                                            value={product.suitable}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-4">
                        {/* STATUS */}
                        <div className="card dashboard-card mb-4">
                            <div className="card-body">
                                <h5>Status</h5>
                                <div className="form-check form-switch mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={product.status}
                                        name="status"
                                        onChange={(e) => setProduct({ ...product, status: e.target.checked })}
                                    />
                                    <label className="form-check-label">
                                        {product.status ? "Active" : "Inactive"}
                                    </label>
                                </div>


                                <label className="form-label mt-3">Publish Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="publishDate"
                                    value={product.publishDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* ORGANIZATION */}
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5>Organization</h5>

                                {/* CATEGORY */}
                                <label className="form-label mt-2">Category</label>
                                <div className="d-flex mb-2">
                                    <select
                                        className="form-select me-2"
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                    >
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Input + Button to add new category */}
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Add new category"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => {
                                            if (newCategory && !categories.includes(newCategory)) {
                                                setCategories([...categories, newCategory]);
                                                setProduct({ ...product, category: newCategory });
                                                setNewCategory("");
                                            }
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* VENDOR */}
                                <label className="form-label mt-3">Vendor</label>
                                <select
                                    className="form-select"
                                    name="vendor"
                                    value={product.vendor}
                                    onChange={handleChange}
                                >
                                    <option>Official Store</option>
                                </select>

                                {/* TAGS */}
                                <label className="form-label mt-3">Tags</label>
                                <input
                                    className="form-control"
                                    placeholder="Wireless, Audio"
                                    name="tags"
                                    value={product.tags}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductAdd;
