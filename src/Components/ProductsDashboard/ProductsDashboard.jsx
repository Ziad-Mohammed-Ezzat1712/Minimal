import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductsDashboard() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category_name: '',
    media_type: 'image',
  });
  const [mainFile, setMainFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previewMedia, setPreviewMedia] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://trafficstudio360.com/projects/allProjects.php');
      if (res.data.status === 200) {
        setProjects(res.data.data);
      }
    } catch {
      toast.error('فشل تحميل المشاريع');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    setMainFile(file);
  };

  const handleMediaFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      existing: false,
    }));

    setMediaFiles(prev => [...prev, ...files]);
    setPreviewMedia(prev => [...prev, ...newPreviews]);
  };

  const handleRemovePreview = (indexToRemove) => {
    setPreviewMedia(prev => {
      const updated = [...prev];
      if (!updated[indexToRemove].existing) {
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== indexToRemove));
      }
      URL.revokeObjectURL(updated[indexToRemove].preview);
      updated.splice(indexToRemove, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category_name) {
      toast.error('يرجى ملء الحقول');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category_name', form.category_name);
    formData.append('media_type', form.media_type);
    if (mainFile && mainFile.name) formData.append('file', mainFile);

    mediaFiles.forEach(file => {
      formData.append('media_files[]', file);
    });

    try {
      let res;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEditing) {
        formData.append('id', editId);
        res = await axios.post('https://trafficstudio360.com/projects/update.php', formData, config);
      } else {
        res = await axios.post('https://trafficstudio360.com/projects/add.php', formData, config);
      }

      if (res.data.status === 200) {
        toast.success(isEditing ? 'تم التعديل بنجاح' : 'تمت الإضافة بنجاح');
        resetForm();
        fetchProjects();
      } else {
        toast.error(res.data.message || 'حدث خطأ');
      }
    } catch {
      toast.error('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      category_name: project.category_name,
      media_type: project.media_type,
    });

    setIsEditing(true);
    setEditId(project.id);

    if (project.file_path) {
      const fullCover = `https://trafficstudio360.com/${project.file_path}`;
      setMainFile({ preview: fullCover });
    }

    if (project.first_media && Array.isArray(project.first_media)) {
      const existingPreviews = project.first_media.map((file) => ({
        preview: `https://trafficstudio360.com/${file}`,
        type: file.endsWith('.mp4') || file.endsWith('.webm') ? 'video' : 'image',
        existing: true,
      }));
      setPreviewMedia(existingPreviews);
      setMediaFiles([]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category_name: '',
      media_type: 'image',
    });
    setMainFile(null);
    setMediaFiles([]);
    setPreviewMedia([]);
    setIsEditing(false);
    setEditId(null);
    document.getElementById('mainFile').value = null;
    document.getElementById('mediaFiles').value = null;
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (window.confirm('هل أنت متأكد من حذف المشروع؟')) {
      try {
        const formData = new FormData();
        formData.append('id', id);

        const res = await axios.post(
          'https://trafficstudio360.com/projects/delete.php',
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.status === 200) {
          toast.success('تم الحذف بنجاح');
          fetchProjects();
        } else {
          toast.error(res.data.message || 'فشل في الحذف');
        }
      } catch {
        toast.error('خطأ في الاتصال');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Project' : 'Add New Project'}</h1>
        <button
          onClick={handleLogout}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md mb-10">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-lg px-4 py-2"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-lg px-4 py-2"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category_name"
            className="w-full border rounded-lg px-4 py-2"
            value={form.category_name}
            onChange={handleChange}
          >
            <option value="">-- Choose Category --</option>
            <option value="Motion Graphics">Motion Graphics</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Videography">Videography</option>
            <option value="Photography">Photography</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Media Type</label>
          <select
            name="media_type"
            className="w-full border rounded-lg px-4 py-2"
            value={form.media_type}
            onChange={handleChange}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Image Cover</label>
          <input type="file" id="mainFile" accept="image/*,video/*" onChange={handleMainFileChange} />
          {mainFile?.preview && (
            <img src={mainFile.preview} alt="cover" className="w-32 h-32 mt-2 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block mb-1">Images or Videos</label>
          <input
            type="file"
            id="mediaFiles"
            multiple
            accept="image/*,video/*"
            onChange={handleMediaFilesChange}
            className="mb-3"
          />

          {previewMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {previewMedia.map((media, idx) => (
                <div key={idx} className="relative border rounded p-1 shadow">
                  {media.type === 'image' ? (
                    <img src={media.preview} alt={`media-${idx}`} className="w-full h-32 object-cover rounded" />
                  ) : (
                    <video src={media.preview} controls className="w-full h-32 object-cover rounded" />
                  )}
                  <button
                    onClick={() => handleRemovePreview(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Loading ...
            </>
          ) : isEditing ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            {p.media_type === 'image' ? (
              <img
                src={`https://trafficstudio360.com/${p.file_path}`}
                alt={p.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            ) : (
              <video
                controls
                className="w-full h-48 rounded mb-4"
                src={`https://trafficstudio360.com/${p.file_path}`}
              />
            )}
            <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{p.description}</p>
            <p className="text-orange-500 text-sm font-semibold mb-2">التصنيف: {p.category_name}</p>
            <p className="text-gray-400 text-xs mb-2">تاريخ الإضافة: {p.uploaded_at}</p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



  //  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       {products.map((p) => (
  //         <div key={p.id} className="bg-white p-4 rounded shadow">
  //           {p.media_type === 'image' ? (
  //             <img
  //               src={`https://trafficstudio360.com/${p.file_path}`}
  //               alt={p.title}
  //               className="w-full h-48 object-cover rounded mb-4"
  //             />
  //           ) : (
  //             <video
  //               controls
  //               className="w-full h-48 rounded mb-4"
  //               src={`https://trafficstudio360.com/${p.file_path}`}
  //             />
  //           )}
  //           <h3 className="text-xl font-semibold">{p.title}</h3>
  //           <p className="text-sm text-gray-600">{p.description}</p>
  //           <p className="text-orange-500 font-semibold">Category: {p.category_name}</p>
  //           <div className="mt-4 flex justify-between">
  //             <button
  //               onClick={() => handleEdit(p)}
  //               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
  //             >
  //               Edit
  //             </button>
  //             <button
  //               onClick={() => handleDelete(p.id)}
  //               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
