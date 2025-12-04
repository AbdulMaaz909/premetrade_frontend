"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserDetails, isSuccess } from "@/utilities";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEdit2, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import {
  createTasks,
  fetchTasks,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  registerUser,
  updateProfile,
} from "@/service";

const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userDetails = getUserDetails() || {};
  const { name = "-", email = "-" } = userDetails;
  const [profileName, setProfileName] = useState(name);
  const [profileImage, setProfileImage] = useState(`${localStorage.getItem('profile')}`);
  const profile=`${localStorage.getItem('profile')}`;
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const taskSchema = z.object({
    title: z.string().min(1, { message: "Task title is required" }),
    description: z.string().min(1, { message: "Task description is required" }),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const editForm = useForm({
    resolver: zodResolver(taskSchema),
  });


  // Fetch tasks
  const getTasks = async () => {
    try {
      const fetchTaskRes = await fetchTasks();
      if (isSuccess(fetchTaskRes)) {
        const { task } = fetchTaskRes.data || [];
        setTasks(fetchTaskRes.data.tasks);
      } else {
        toast.error("Error while Fetching the task!");
      }
    } catch (error) {
      toast.error(error.response?.data || "Error wjile fetching the task!");
      console.error(error);
    }
  };

  // Create task
  const onCreateTask = async (values) => {
    try {
      const createTaskRes = await createTasks({
        title: values.title,
        description: values.description,
      });
      if (isSuccess(createTaskRes)) {
        toast.success(`Task ${values.title} added successfully!`);
        reset();
        getTasks();
      } else {
        toast.error("Error while creating the task!");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Error while creating the task!");
      console.error(error);
    }
  };

  //get image from database

  const getImage = async (body) => {
    try {
      const res = await registerUser();
    } catch (error) {
      toast.error(error?.response?.data || "Error while fetching Image!");
      console.error(error);
    }
  };

  // Update task
  const onUpdateTask = async (values) => {
    try {
      const res = await updateTaskService(editingId, {
        title: values.title,
        description: values.description,
      });
      if (isSuccess(res)) {
        toast.success(`Task ${values.title} updated successfully!`);
        setEditingId(null);
        getTasks();
      } else {
        toast.error("Error while updating the task!");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Error while updating the task!");
      console.error(error);
    }
  };

  // Delete task
  const deleteTask = async (id, taskTitle) => {
    try {
      const res = await deleteTaskService(id);
      if (isSuccess(res)) {
        toast.success(`Task ${taskTitle} deleted successfully!`);
        getTasks();
      } else {
        toast.error("Error while deleting the task!");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Error while deleting the task!");
      console.error(error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    router.push("/");
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Convert dataURL (base64) to Blob for multipart upload
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Save profile (name + optional photo)
  const saveProfile = async () => {
    try {
      setIsSavingProfile(true);
      const form = new FormData();
      form.append('name', profileName || '');

      // If profileImage is a data URL, convert to Blob and append
      if (profileImage && typeof profileImage === 'string' && profileImage.startsWith('data:')) {
        const blob = dataURLtoBlob(profileImage);
        form.append('photo', blob, 'profile.png');
      }

      const res = await updateProfile(form);
      if (isSuccess(res)) {
        toast.success('Profile updated successfully!');
        // If backend returned updated profile URL, persist it; otherwise keep current data URL
        const returnedProfile = res.data?.user?.profile || res.data?.profile;
        if (returnedProfile) {
          localStorage.setItem('profile', returnedProfile);
          setProfileImage(returnedProfile);
        } else if (profileImage) {
          localStorage.setItem('profile', profileImage);
        }
        setIsEditingProfile(false);
      } else {
        toast.error('Error while updating profile!');
      }
    } catch (error) {
      toast.error(error?.response?.data || 'Error while updating profile!');
      console.error(error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Compute filtered tasks on the fly
  const displayedTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-lg p-6 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-3xl font-bold text-black">Task Dashboard</h1>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition overflow-hidden shadow-md"
          title="Profile"
        >
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">

            {/* Search */}
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

      {/* Create Task */}
      <form
        onSubmit={handleSubmit(onCreateTask)}
        className="flex flex-col gap-3 mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-black mb-2">Add New Task</h3>
        <input
          type="text"
          placeholder="Enter task title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          {...register("title")}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        <input
          type="text"
          placeholder="Enter task description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          {...register("description")}
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition font-medium" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {displayedTasks.map((task) => (
          <li
            key={task._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            {editingId === task._id ? (
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col md:flex-row md:gap-2 gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      {...editForm.register("title")}
                    />
                    {editForm.formState.errors.title && <p className="text-red-600 text-sm mt-1">{editForm.formState.errors.title.message}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      {...editForm.register("description")}
                    />
                    {editForm.formState.errors.description && <p className="text-red-600 text-sm mt-1">{editForm.formState.errors.description.message}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:justify-between w-full">
                <div>
                  <span className="font-semibold text-lg">{task.title}</span>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-3 md:mt-0">
              {editingId === task._id ? (
                <>
                  <button
                    onClick={() => editForm.handleSubmit(onUpdateTask)()}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition disabled:opacity-50 font-semibold"
                    disabled={editForm.formState.isSubmitting}
                    title="Save"
                  >
                    <FiCheck size={20} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                    title="Cancel"
                  >
                    <FiX size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(task._id);
                      editForm.reset({ title: task.title, description: task.description });
                    }}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded transition"
                    title="Edit"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteTask(task._id, task.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    title="Delete"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
            </ul>
        </div>
      </div>

      {/* Profile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isProfileOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close button */}
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>

        {/* Profile Content */}
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
              title={isEditingProfile ? "Cancel" : "Edit"}
            >
              {isEditingProfile ? <FiX size={20} /> : <FiEdit2 size={20} />}
            </button>
          </div>
          
          {/* Avatar with Upload */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition">
                <FiEdit2 size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfileImage(reader.result);
                        localStorage.setItem('profile', reader.result);
                        toast.success('Profile image updated!');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* User Info Fields */}
          <div className="space-y-4 mb-8">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                disabled={!isEditingProfile}
                className={isEditingProfile ? "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-text" : "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"}
              />
            </div>

            {/* Email Field (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Changes Button - Only show in edit mode */}
          {isEditingProfile && (
            <button
              onClick={() => saveProfile()}
              disabled={isSavingProfile}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition duration-200 mb-2 disabled:opacity-60"
            >
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setIsProfileOpen(false);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
