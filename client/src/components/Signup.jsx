import {  useEffect, useRef, useState } from "react";
import graphic from "./images/contact-anim.gif";
import "./styles/signin.css";
import AIWriter from "react-aiwriter";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { signup } from "../redux/action.js";

export default function SignUp() {
  const refForm = useRef();
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    location: "",
    profileImage: null,
    profileImagePreview: null, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: imageUrl,
      }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      console.log(formData);
      toast.error("Please fill in all required fields!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if(!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("location", formData.location);
    if (formData.profileImage) {
      formDataToSend.append("profile", formData.profileImage);
    }

    dispatch(signup(formDataToSend));
  }

  return (
    <>
      <div className="main">
        <div className="row d-flex mx-auto">
          <div className="text col-sm-6 px-5">
            <div className="codebird">
              <h1 className="text-brown">
                S<span className="text-warning">ign</span>Up
              </h1>
            </div>
            <div className="sub-text my-5 text-white">
              <AIWriter delay={125}>
                Join our platform and be a part of something amazing. Sign up
                now and get started!
              </AIWriter>
            </div>
            <div className="signin-form mt-5">
              <form ref={refForm} onSubmit={handleSignup} encType="multipart/form-data">
                <ul>
                  <li className="half">
                    <input
                      className={`rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </li>

                  <li className="half">
                    <input
                      className={`rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </li>

                  <li>
                    <input
                      className={`w-100 p-2 rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </li>

                  <li>
                    <input
                      className={`w-100 p-2 rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </li>

                  <li>
                    <select
                      className={`w-100 p-2 rounded bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="adopter">Adopter</option>
                      <option value="user">User</option>
                    </select>
                  </li>

                  <li>
                    <input
                      className={`rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="text"
                      name="phone"
                      placeholder="Phone (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </li>

                  <li>
                    <input
                      className={`rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      type="text"
                      name="location"
                      placeholder="Location (Optional)"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </li>

                  <li>
                    <label className="text-white">Upload Profile Image</label>
                    <br />
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      className={`rounded-pill bg-${theme} ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                      onChange={handleImageChange}
                    />
                  </li>

                  {formData.profileImagePreview && (
                    <li>
                      <img
                        src={formData.profileImagePreview}
                        alt="Profile Preview"
                        className="img-thumbnail mt-2"
                        style={{ maxWidth: "150px", borderRadius: "10px" }}
                      />
                    </li>
                  )}

                  <div className="row mt-5 text-white">
                    <li>
                      Already have an account? <a href="/signin">Sign In Here.</a>
                    </li>
                    <li>
                      <input
                        type="submit"
                        className="flat-button button btn bg-warning"
                        value="Sign Up"
                      />
                    </li>
                  </div>
                </ul>
              </form>
            </div>
          </div>

          <div className="anim col-sm-6 img-fluid mx-auto d-flex">
            <img
              className="home-anim rounded img-fluid mx-auto d-flex"
              src={graphic}
              alt="Signup Animation"
            />
          </div>
        </div>
      </div>
    </>
  );
}
