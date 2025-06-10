// App.js
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Form from './components/Form';
import AdminPanel from './pages/AdminPanel';
import Table from './components/Table';
import Home from './pages/Home';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './components/Product';
import Cart from './components/Cart';

function App() {
  const [product, setProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState({});
  const [editId, setEditId] = useState(0);

  const imageRef = useRef();
  const navigate = useNavigate();

  const URL = 'http://localhost:3000/products';

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setProductData(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === 'options') {
      let newOptions = [...options];
      if (checked) newOptions.push(value);
      else newOptions = newOptions.filter((opt) => opt !== value);
      setOptions(newOptions);
      setProduct({ ...product, options: newOptions });
    } else if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: { name: file.name, type: file.type, url: reader.result } });
      };
      reader.readAsDataURL(file);
    } else if (name === 'stock') {
      setProduct({ ...product, stock: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const validation = () => {
    const errors = {};
    if (!product.pName) errors.pName = "Product name is required";
    if (!product.sku) errors.sku = "Stock is required";
    if (!product.brand) errors.brand = "Brand is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.price) errors.price = "Price is required";
    if (!product.image) errors.image = "Image is required";
    if (!product.rating) errors.rating = "Rating is required";
    if (!product.content) errors.content = "Content is required";
    if (!product.options || product.options.length === 0)
      errors.options = "At least one option is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) return;

    try {
      if (editId) {
        await axios.put(`${URL}/${editId}`, product);
        toast.success("✅ Product updated successfully!");
        setEditId(0);
      } else {
        await axios.post(URL, product);
        toast.success("✅ Product added successfully!");
      }

      const res = await axios.get(URL);
      setProductData(res.data);
      setProduct({});
      setOptions([]);
      imageRef.current.value = "";
      setError({});
      navigate('/table');
    } catch (err) {
      toast.error("❌ Submission failed!");
      console.error("Submission error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      toast.error("🗑️ Product deleted!");
      const res = await axios.get(URL);
      setProductData(res.data);
    } catch (err) {
      toast.error("❌ Delete failed!");
      console.error("Delete error:", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      setProduct(res.data);
      setOptions(res.data.options || []);
      setEditId(id);
      toast.info("✏️ Editing product...");
      navigate("/form");
    } catch (err) {
      toast.error("❌ Failed to load product!");
      console.error("Edit fetch error:", err);
    }
  };

  return (
    <>
      <Routes>
        <Route path='/client' element={<Home productData={productData} />} />

        <Route path='/product' element={<Product product={product} productData={productData} />} />

        <Route path='/cart' element={<Cart />} />

        <Route path='/' element={<AdminPanel />} />


        <Route path='/form' element={
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            product={product}
            imageRef={imageRef}
            error={error}
            options={options}
          />
        } />

        <Route path='/table' element={
          <Table
            productData={productData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        } />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
