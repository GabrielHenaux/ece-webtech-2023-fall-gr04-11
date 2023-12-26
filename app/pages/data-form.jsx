import React, {useContext, useState} from 'react';
import {supabase} from "@supabase/auth-ui-shared";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import UserContext from "@/components/UserContext";
import {useRouter} from "next/router";

function DataForm() {
    const {user, profile, logout} = useContext(UserContext)
    const supabase = useSupabaseClient()
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        username: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit');
        const {data, error} = await supabase
            .from('profiles')
            .update({
                firstname: formData.firstName,
                lastname: formData.lastName,
                address: formData.address,
                username: formData.username,
            })
            .match({id: user.id});

        if (error) {
            console.error('Erreur lors de la mise à jour:', error);
            return null;
        }
        console.log('Mise à jour réussie:', data);
        await router.push('/');
        return data;
    };

    return (



    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );

}


export default DataForm;
