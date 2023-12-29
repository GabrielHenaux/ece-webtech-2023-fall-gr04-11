import { useState } from 'react';
import supabase from "@/components/supabaseClient";

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Register user with Supabase
        const { user, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error('Error in user registration:', error);
            return;
        }

        // Call function to create user profile
        await createUserProfile(user, { username, address });
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            <button type="submit">Register</button>
        </form>
    );
}

// Function to create user profile
async function createUserProfile(user, additionalDetails) {
    const { data, error } = await supabase
        .from('user_profiles')
        .insert([
            { user_id: user.id, ...additionalDetails }
        ]);

    if (error) {
        console.error('Error creating user profile:', error);
    }
    return data;
}

export default RegistrationForm;
