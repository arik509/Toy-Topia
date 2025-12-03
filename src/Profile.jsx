import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { getAuth } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { FaPen, FaEnvelope, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import DynamicHelmet from "./DynamicHelmet";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setLoading(false);
    }
  }, [auth.currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicHelmet title="Profile" />
      <Toaster position="top-right" />
      
      <div className="w-11/12 mx-auto">
        <div className="my-8 text-lg">
          <Link to="/" className="text-gray-600 hover:text-[#ff7b54] transition">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-secondary font-semibold">Profile</span>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-10">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={auth.currentUser?.photoURL || "https://via.placeholder.com/150"}
              alt={auth.currentUser?.displayName || "User"}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {auth.currentUser?.displayName || "User"}
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FaUser className="text-gray-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Display Name</p>
                <p className="text-gray-800 font-medium">
                  {auth.currentUser?.displayName || "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-gray-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-800 font-medium">
                  {auth.currentUser?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/profile/update-profile"
              className="flex-1 bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FaPen /> Edit Profile
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
