import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  showPassword: false,
  phoneCode: '',
  phoneNumber: '',
  country: '',
  city: '',
  pan: '',
  aadhar: ''
};

export default function Form() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (values) => {
    const newErrors = {};
    if (!values.firstName) newErrors.firstName = 'First Name is required';
    if (!values.lastName) newErrors.lastName = 'Last Name is required';
    if (!values.username) newErrors.username = 'Username is required';
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Valid Email is required';
    if (!values.password || values.password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (!values.phoneCode) newErrors.phoneCode = 'Country code is required';
    if (!values.phoneNumber || !/^\d{10}$/.test(values.phoneNumber)) newErrors.phoneNumber = 'Valid 10-digit phone number required';
    if (!values.country) newErrors.country = 'Country is required';
    if (!values.city) newErrors.city = 'City is required';
    if (!values.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.pan)) newErrors.pan = 'Valid PAN required';
    if (!values.aadhar || !/^\d{12}$/.test(values.aadhar)) newErrors.aadhar = 'Valid 12-digit Aadhar required';
    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length === 0) {
      navigate('/success', { state: form });
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2 className="form-title">User Registration</h2>

        {/* First Row */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        {/* Second Row */}
        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input type={form.showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} />
          <label className="checkbox-label">
            <input type="checkbox" name="showPassword" checked={form.showPassword} onChange={handleChange} /> Show Password
          </label>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Phone */}
        <div className="form-row">
          <div className="form-group">
            <label>Country Code</label>
            <input type="text" name="phoneCode" placeholder="+91" value={form.phoneCode} onChange={handleChange} />
            {errors.phoneCode && <span className="error">{errors.phoneCode}</span>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" placeholder="1234567890" value={form.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>
        </div>

        {/* Country & City */}
        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">-- Select Country --</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <div className="form-group">
            <label>City</label>
            <select name="city" value={form.city} onChange={handleChange}>
              <option value="">-- Select City --</option>
              {form.country === 'India' && (
                <>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </>
              )}
              {form.country === 'USA' && (
                <>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                </>
              )}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
        </div>

        {/* PAN & Aadhar */}
        <div className="form-row">
          <div className="form-group">
            <label>PAN Number</label>
            <input type="text" name="pan" value={form.pan} onChange={handleChange} />
            {errors.pan && <span className="error">{errors.pan}</span>}
          </div>
          <div className="form-group">
            <label>Aadhar Number</label>
            <input type="text" name="aadhar" value={form.aadhar} onChange={handleChange} />
            {errors.aadhar && <span className="error">{errors.aadhar}</span>}
          </div>
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0}>Submit</button>
      </form>
    </div>
  );
}
