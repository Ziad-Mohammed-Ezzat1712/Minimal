import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://trafficstudio360.com/auth/login.php',
        qs.stringify(form),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

     

      if (res.data.status === 200) {
        const token = res.data.data?.token;

        if (token) {
          localStorage.setItem('adminToken', token); // ✅ حفظ التوكن
          toast.success('Login successful!');
          navigate('/admin/dashboard'); // توجه لصفحة الداشبورد
        } else {
          toast.error('Login failed: no token received.');
        }
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed!';
      toast.error(errMsg);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-500"
        >
          Login
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
