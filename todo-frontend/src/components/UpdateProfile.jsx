import { useContext, useState } from "react";
import {UserContext} from '../context/UserContext.js'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {

  const {user, setUser} = useContext(UserContext)

  const [profileImg, setProfileImg] = useState(user.profilePic?.url);
  const [pic , setPic] = useState(null)
  const [username, setUsername] = useState(user.username);
  const [mobile, setMobile] = useState(user.mob);

  const [editUsername, setEditUsername] = useState(false);
  const [editMobile, setEditMobile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [conformPassword, setConformPassword] = useState("")
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPic(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/update-password',{
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({currentPassword, newPassword, conformPassword}),
        credentials: "include"
      })
  
      const data = await response.json()
      if(!response.ok) {
        return toast.error(data.message)
      }
  
      if(!data) {
        return toast.error("data not found")
      }

      setCurrentPassword("")
      setNewPassword("")
      setConformPassword("")
      setShowPasswordModal(false)
      return toast.success(data.message)
    } catch (error) {
      toast.error(error)
    }

  }

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/update-profile',{
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({username, mobile}),
        credentials: "include"
      })
  
      if(!response.ok) {
        return toast.error("password not updated")
      }
  
      const data = await response.json()
  
      if(!data) {
        return toast.error("data not found")
      }
      setUser((prev) => ({
        ...prev,
        username: data.username,
        mob : data.mob
      }))
      setEditUsername(false)
      toast.success(data.message)
    } catch (error) {
      toast.error(error)
    }
  }

  const updateProfilePic = async () => {
    try {
      const obj = new FormData()
      obj.append('profileImg', pic)

      const response = await fetch('http://localhost:3000/user/update-profilePic',{
        method: "POST",
        body: obj,
        credentials: "include"
      })
  
      const data = await response.json()
      if(!response.ok) {
        return toast.error(data.message)
      }
  
      if(!data) {
        return toast.error("data not found")
      }
      setUser((prev) => ({
        ...prev,
        profilePic: {
          url: data.url,
        }
      }))
      toast.success(data.message)
      
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className=" z-50 flex items-center justify-center bg-black/60 px-4 ">
      {/* Profile Card */}
      <div className="relative w-full m-5 max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-400 to-orange-400 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
            Profile Settings
          </h2>
          <p className="mt-1 text-sm text-gray-800/70">
            Manage your profile information
          </p>
          </div>
          <button onClick={() => navigate("/profile", {replace: true})} className="text-xl font-bold">X</button>
        </div>

        <div className="space-y-6 p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="profile-image"
              className="group relative cursor-pointer"
            >
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-amber-400 bg-gray-100 shadow-lg">
                {profileImg ? (
                    <img
                    src={profileImg}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                  
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-400">
                    U
                  </div>
                )}
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                <span className="text-sm font-semibold text-white">
                  Change Photo
                </span>
              </div>
            </label>

            <input
              id="profile-image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-xs text-gray-500">
              Click the image to change your profile photo
            </p>
            {
              pic && <button className="bg-green-500 rounded p-1 text-white active:bg-green-700 " onClick={updateProfilePic}>change</button>
            }
          </div>

          {/* Username */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Username
                </label>

                {editUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-amber-400 bg-white px-3 py-2 text-gray-800 outline-none ring-2 ring-transparent transition focus:ring-amber-200"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{username}</p>
                )}
              </div>

              {editUsername ? (
                <button
                  onClick={() => updateProfile()}
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditUsername(true)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Mobile
                </label>

                {editMobile ? (
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full rounded-lg border border-amber-400 bg-white px-3 py-2 text-gray-800 outline-none ring-2 ring-transparent transition focus:ring-amber-200"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{mobile}</p>
                )}
              </div>

              {editMobile ? (
                <button
                  onClick={() => {
                    updateProfile()
                    setEditMobile(false)
                  }}
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditMobile(true)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="border-t border-gray-200 pt-5">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full rounded-xl bg-amber-400 px-5 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-amber-500 active:scale-[0.98]"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Update Password
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your current and new password.
                </p>
              </div>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            {/* Password Inputs */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="text"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="text"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  // API call for password update
                  updatePassword()
                }}
                className="flex-1 rounded-lg bg-amber-400 px-4 py-3 font-semibold text-gray-900 transition hover:bg-amber-500"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}