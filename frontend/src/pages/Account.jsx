import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

function Account() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Fetch current user
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://paytm-wallet-9rzi.onrender.com/api/v1/user/me", {
          headers: { Authorization: "Bearer " + token },
        });
        setUser(res.data.user || {});
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Save updated profile
  const handleSave = async () => {
    try {
      const res = await axios.put("https://paytm-wallet-9rzi.onrender.com/api/v1/user/update", user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setMessage("✅ Profile updated successfully!");
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ Failed to update profile. Try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-blue-600 text-xl">
        Loading account...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navbar />

      <div className="flex flex-col items-center mt-16 mb-10 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">My Account</h2>

          <div className="text-left text-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-semibold">First Name</label>
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-2 rounded-xl border ${
                  editing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-2 rounded-xl border ${
                  editing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Username</label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full p-2 rounded-xl border bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-xl"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl"
              >
                Edit Profile
              </button>
            )}
          </div>

          {message && (
            <p className="mt-4 text-gray-700 font-medium text-center">{message}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Account;
