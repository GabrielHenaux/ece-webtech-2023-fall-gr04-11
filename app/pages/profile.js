import { useRouter } from 'next/router'
import { useContext } from 'react';
import UserContext from '../components/UserContext'
import Layout from '../components/Layout.js'
import { useState, useEffect } from 'react';
import supabase from "@/components/supabaseClient";
export default function Page() {
  const router = useRouter();
  const { user,profile, logout, setProfile} = useContext(UserContext);
  const [editing, setEditing] = useState(false);
    const handleEdit = () => {
        if (editing) {
            handleCancel();
            return;
        }
        setEditing(true);
    };
    const handleCancel = () => {
        setEditing(false);
    }
    const handleSave = async () => {
        setProfile(profile);
        setEditing(false);
    };
  const onClickLogout = () => {
    logout()
  }
  return (
    <Layout
      title="Profile"
      description="User profile page"
      >
      <h1 className='text-4xl md:text-5xl lg:text-3xl font-bold text-center text-gray-800 uppercase tracking-wide'>
        Dear, {profile?.username || user?.email}
      </h1>
        <h2 className='text-2xl md:text-3xl lg:text-2xl font-bold text-center text-gray-800 uppercase tracking-wide'>
            Welcome to your profile page
        </h2>
        <br/>
        <br/>
        <h4 className='text-1xl md:text-1xl lg:text-1xl font-bold text-center text-gray-800 uppercase tracking-wide'>
            {profile ? profile.firstname ===null || profile.lastname === null || profile.address === null || profile.username === null ? ("Please complete your profile") : "Your profile" : "Loading..."}
        </h4>
        <div className="container mx-auto p-4">
            {editing ? (
                <div className="grid grid-cols-1 gap-5 lg:w-full mx-auto">
                    <div className="mx-auto min-h-screen flex flex-col items-center ">
                        <p>
                            First name: {profile ? profile.firstname : "Loading..."}
                        </p>
                        <input
                            type="text"
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            onChange={(e) => {
                                profile.firstname = e.target.value;
                                }}
                            placeholder="First Name"
                        />
                        <p>
                            Last name: {profile ? profile.lastname : "Loading..."}
                        </p>
                        <input
                            type="text"
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            onChange={(e) => {
                                profile.lastname = e.target.value;
                            }}
                            placeholder="Last Name"
                        />
                        <p>
                            Username: {profile ? profile.username : "Loading..."}
                        </p>
                        <input
                            type="text"
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            onChange={(e) => {
                                profile.username = e.target.value;
                            }}
                            placeholder="Username"
                        />
                        <p>
                            Address: {profile.address}
                        </p>
                        <input
                            type="text"
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            onChange={(e) => {
                                profile.address = e.target.value;
                            }}
                            placeholder="Address"
                        />
                        <div className="flex gap-2">
                        <button onClick={handleSave}
                                className="mt-6 text-xl py-3 px-6 mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition duration-200
                        ">
                            Save
                        </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-2xl bg-gray-400 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <ul className="text-gray-800 text-lg">
                        <li>
                            <div className="rounded-lg mb-2">
                                <strong>First Name:</strong> {profile ? profile.firstname : "Loading..."}
                            </div>
                        </li>
                        <li>
                            <div className="rounded-lg mb-2">
                                <strong>Last Name:</strong> {profile ? profile.lastname : "Loading..."}
                            </div>
                        </li>
                        <li>
                            <div className="rounded-lg mb-2">
                                <strong>Username:</strong> {profile ? profile.username : "Loading..."}
                            </div>
                        </li>
                        <li>
                            <div className="rounded-lg mb-2">
                                <strong>Address:</strong> {profile ? profile.address : "Loading..."}
                            </div>
                        </li>
                    </ul>
                    <button
                        onClick={handleEdit}
                        className="mt-4 text-xl py-2 px-4 mx-auto block bg-white text-red-600 font-bold rounded-full shadow-lg hover:bg-gray-200 transition duration-200">
                        Edit</button>
                </div>
            )}
        </div>
        <div className="mb-8">
        <button
          className="mt-6 text-xl py-3 px-6 mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition duration-200
"
          onClick={onClickLogout}
        >
          Sign out
        </button>
      </div>
    </Layout>
  )
}