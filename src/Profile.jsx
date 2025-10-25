import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Navbar from "./Components/Navbar";
import { Helmet } from "react-helmet-async";
import DynamicHelmet from "./DynamicHelmet";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || "");
      setPhoto(auth.currentUser.photoURL || "");
    }
    setLoading(false);
  }, [auth.currentUser]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error("User not logged in!");
      return;
    }

    updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...auth.currentUser }); // update context with latest user
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <DynamicHelmet title="Profile"></DynamicHelmet>
        <Navbar></Navbar>
        <div className="my-[30px] text-[20px] w-11/12 mx-auto">
        <Link to="/">Home</Link>  / <span className="text-secondary">profile</span>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <Toaster position="top-right" />
        <div className="card w-full max-w-md p-8 shadow-lg flex flex-col gap-4 bg-white">
          <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

          <img
            src={
              auth.currentUser?.photoURL || "https://via.placeholder.com/150"
            }
            alt={auth.currentUser?.displayName || "User"}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="text-center mb-4">{auth.currentUser?.displayName}</p>

          <p><span className="font-bold">Email: </span>{auth.currentUser?.email}</p>
          <p><span className="font-bold">Photo URL: </span>{auth.currentUser?.photoURL}</p>

            <Link to="/profile/update-profile" type="submit" className="btn btn-secondary w-full">
             <FaPen></FaPen> Edit Profile
            </Link>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline mt-4 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
