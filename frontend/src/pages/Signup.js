import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from "../hooks/useForm";
import validate from '../components/signupFormValidation';
import { addUser, generateUniqueId } from "../data/repository";

const Signup = () => {
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(signup, validate);

  function signup() {

    const uniqueId = generateUniqueId();

    // Storing user details in local storage
    const userData = {
      id: uniqueId, 
      name: values.name,
      email: values.email,
      password: values.password,
      joinDate: new Date().toISOString(),
    };

    // Add user to local storage
    addUser(userData);

    // Set signup success state to true
    setSignupSuccess(true);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Store current user data
    
    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate('/profile');
    }, 3500);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 mx-auto">
          <div className="card custom-form">
            <div className="card-body">
              <h1 className="mb-2 fs-4 text-center">Sign Up</h1>
              {signupSuccess ? (
                <p className="text-success mb-3 text-center">Sign up success! You are now logged in & will be redirected to your profile.</p>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">*Name:</label>
                    <input autoComplete="off" className={`form-control ${errors.name && 'is-invalid'}`} type="text" name="name" onChange={handleChange} value={values.name || ''} required />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">*Email Address:</label>
                    <input autoComplete="off" className={`form-control ${errors.email && 'is-invalid'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">*Create Password:</label>
                    <input autoComplete="off" className={`form-control ${errors.password && 'is-invalid'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} placeholder="Include uppercase, lowercase, special character & number" required />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">*Confirm Password:</label>
                    <input autoComplete="off" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} placeholder="Confirm password" required />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>
                  <div className="text-center"> 
                    <button type="submit" className="btn custom-button">Sign Up</button>
                  </div>
                  <div className="mt-3 text-center"> 
                    Already have an account? <Link to="/login">Log in!</Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;