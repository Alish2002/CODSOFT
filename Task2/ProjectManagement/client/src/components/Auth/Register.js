import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showDialog,setShowDialog]=useState(false);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    if (password !== confirmPassword) {
      setPasswordError("Password do not match");
      return;
    }
    dispatch(register(formData));
    setShowDialog(true);
  };

  return (
    <div>
    <div className="font-bold shadow hover:shadow-md hover:bg-blue-200 text-2xl border-2 text-center w-fit border-blue-200 rounded mx-auto mb-10 mt-6 p-4 h-16 flex items-center justify-center">
      ManageMate
    </div>
    <div className="w-full max-w-md mx-auto border-2 shadow-md rounded-lg p-6 bg-white">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
        <div className="my-5 text-center">
          <button
            className="bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 focus:bg-blue-800 w-28 h-10 text-xl font-medium rounded"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white border-2 text-center border-gray-700 rounded-md p-10 m-4">
            <h2 className="text-xl font-bold mb-4">Email Verification</h2>
            <p className="mb-4">
              A verification link has been sent to your email. Please verify your email to complete the registration.
            </p>
            <Link to="/">
              <button className="bg-blue-600 text-white w-28 h-10 rounded hover:bg-blue-700">
                Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Register;
