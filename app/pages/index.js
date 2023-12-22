import React, { useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Layout from '../components/Layout.js';
import UserContext from '../components/UserContext';
import AuthForm from "@/pages/auth-form";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page({ articles }) {
    const [search, setSearch] = useState('');
    const router = useRouter();

    // Handles the search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        // Redirects to the same page with the search query
        router.push(`/?search=${search}`);
    };

    return (
        <Layout title="HomePage" description="Generated by create next app">
            <h1>Welcome to Ferrari News website</h1>
            <p>This is the home page</p>

            {/* Search form */}
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search articles..." 
                />
                <button type="submit">Search</button>
            </form>

            {/* Displaying the list of articles */}
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        {/* Link to the individual article */}
                        <Link href={`/articles/${article.id}`}>
                            <p>{article.title}</p>
                        </Link>
                        {/* Additional article details can be added here if needed */}
                    </li>
                ))}
            </ul>
        </Layout>
    );
}


export async function getServerSideProps({ query }) {
    const searchTerm = query.search || '';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    let data = [];
    let error = null;

    // Fetch articles from Supabase
    if (searchTerm) {
        let request = supabase
            .from('articles')
            .select(`
                *,
                author:contacts (
                    firstname,
                    lastname
                )
            `)
            .order('created_at', { ascending: false });

        // Search for articles with the search term in the title
        const formattedSearchTerm = searchTerm.split(' ').join(' & '); 
        request = request.filter('title', 'fts', formattedSearchTerm); 

        const response = await request;
        data = response.data;
        error = response.error;
    }

    return {
        props: {
            articles: data,
            error: error
        }
    };
}
