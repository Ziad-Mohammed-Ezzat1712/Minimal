import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export default function AdminAddProduct() {
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [colorImages, setColorImages] = useState([]); // [{ color: 'red', images: [File, File] }]
  const [colorInput, setColorInput] = useState('');
  const [colorFiles, setColorFiles] = useState([]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAddColorImages = () => {
    if (!colorInput || colorFiles.length === 0) return;
    setColorImages(prev => [...prev, { color: colorInput.toLowerCase().trim(), images: [...colorFiles] }]);
    setColorInput('');
    setColorFiles([]);
  };

  const removeColorGroup = (index) => {
    const updated = [...colorImages];
    updated.splice(index, 1);
    setColorImages(updated);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      sizes: '',
      stock: '',
      admin_rating: '',
    },
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('brand', values.brand);
      formData.append('sizes', values.sizes);
      formData.append('stock', values.stock);
      formData.append('admin_rating', values.admin_rating);

      if (coverImage) {
        formData.append('cover_image', coverImage);
      }

      // prepare colors and color_images_map
      const colorsArray = colorImages.map(item => item.color);
      const colorImageMap = {};
      colorImages.forEach(item => {
        colorImageMap[item.color] = item.images.length;
        item.images.forEach(img => {
          formData.append('images[]', img);
        });
      });

      formData.append('colors', JSON.stringify(colorsArray));
      formData.append('color_images_map', JSON.stringify(colorImageMap));

      try {
        const { data } = await axios.post(
          'http://localhost/traffic/clothing%20store/products/addProduct.php',
          formData
        );
        alert('Product added successfully!');
        console.log(data);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  });

  return (
    <div className='my-12'>
      <h1 className='text-4xl text-[#9BC2AF] font-bold mb-6'>Admin Page</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white rounded shadow">
        <input name="name" placeholder="Name" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <textarea name="description" placeholder="Description" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <input name="price" placeholder="Price" type="number" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <input name="category" placeholder="Category" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <input name="brand" placeholder="Brand" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />

        {/* Cover Image Upload */}
        <label className="block font-bold">Cover Image:</label>
        <input type="file" accept="image/*" onChange={handleCoverChange} />
        {coverPreview && (
          <div className="mt-2 relative w-32 h-32">
            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover rounded" />
            <button
              type="button"
              onClick={() => {
                setCoverImage(null);
                setCoverPreview(null);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2"
            >×</button>
          </div>
        )}

        {/* Color + Images Upload */}
        <label className="block font-bold mt-4">Add Color with Images:</label>
        <input
          type="text"
          placeholder="Color (e.g. red)"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setColorFiles(Array.from(e.target.files))}
          className="mt-1"
        />
        <button
          type="button"
          onClick={handleAddColorImages}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Add Color Group
        </button>

        {/* Display color-image groups */}
        {colorImages.map((group, idx) => (
          <div key={idx} className="mt-4 border p-2 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold">Color: {group.color}</p>
              <button
                type="button"
                onClick={() => removeColorGroup(idx)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {group.images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} className="w-20 h-20 object-cover rounded" alt="img" />
              ))}
            </div>
          </div>
        ))}

        <input name="sizes" placeholder="Sizes (e.g. L,M,XL)" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <input name="stock" placeholder="Stock" type="number" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />
        <input name="admin_rating" placeholder="Rating (e.g. 4.5)" type="number" step="0.1" onChange={formik.handleChange} className="border border-[#606160] p-2 w-full" />

        <button type="submit" className="bg-[#9BC2AF] text-white font-semibold px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}