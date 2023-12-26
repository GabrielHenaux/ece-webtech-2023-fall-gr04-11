import { useRouter } from 'next/router'
import { useContext } from 'react';
import UserContext from '../components/UserContext'
import Layout from '../components/Layout.js'
import { useState, useEffect } from 'react';
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient();
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
            {profile.firstname ===null || profile.lastname === null || profile.address === null || profile.username === null ? ("Please complete your profile") : "Your profile"}
        </h4>

        <div className="container mx-auto p-4">
            {editing ? (
                <div className="mx-auto min-h-screen flex flex-col items-center ">
                    <p>
                        First name: {profile.firstname}
                    </p>
                    <input
                        type="text"
                        onChange={(e) => {
                            profile.firstname = e.target.value;
                            }}
                        placeholder="First Name"
                    />
                    <p>
                        Last name: {profile.lastname}
                    </p>
                    <input
                        type="text"
                        onChange={(e) => {
                            profile.lastname = e.target.value;
                        }}
                        placeholder="Last Name"
                    />
                    <p>
                        Username: {profile.username}
                    </p>
                    <input
                        type="text"
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
            ) : (
                <div className="mx-auto w-full max-w-2xl bg-red-600 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <ul className="text-gray-800 text-lg">
                        <li><strong>First Name:</strong> {profile.firstname}</li>
                        <li><strong>Last Name:</strong> {profile.lastname}</li>
                        <li><strong>Username:</strong> {profile.username}</li>
                        <li><strong>Address:</strong> {profile.address}</li>
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
