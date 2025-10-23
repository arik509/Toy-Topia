import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Toaster position="top-right" />
      <div className="card w-full max-w-md p-8 shadow-lg flex flex-col gap-4 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

        <img
          src={auth.currentUser?.photoURL || "https://via.placeholder.com/150"}
          alt={auth.currentUser?.displayName || "User"}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <p className="text-center mb-4">{auth.currentUser?.email}</p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Name"
          />
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />
          <button type="submit" className="btn btn-secondary w-full">
            Save Changes
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline mt-4 flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default Profile;
