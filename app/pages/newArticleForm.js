import { useState, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { createApi } from 'unsplash-js';
import UserContext from '../components/UserContext';
import supabase from "@/components/supabaseClient";


// Initialize Unsplash client
const unsplash = createApi({
    accessKey: 'SFWX_WpAKXydFD4ev2muaeLCtjL5lLqnwDxyLH_BmRs', // Unsplash API key to replace with env. variable for the deployment
});



/**
 * Renders a form for creating a new article.
 * 
 * @returns {JSX.Element} The JSX element representing the new article form.
 */

export default function NewArticleForm() {

    // State variables for the form fields
    const [title, setTitle] = useState('');
    const [message, setContent] = useState('');
    const [category, setCategory] = useState('car');
    const [images, setImages] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const { user } = useContext(UserContext);
    const userId = user?.id;

    // Function to search images with the Unsplah API
    const searchImages = async (query) => {
        console.log("Searching for:", query); // check the query in the console
        const response = await unsplash.search.getPhotos({ query });
        console.log("Response from Unsplash:", response); // check the response of unsplash in the console
        if (response.status === 200) {
            setImages(response.response.results);
        } else {
            console.error("Error fetching images:", response);
        }
    };

    // Function to select an image from the search results and set it as the selected image
    const selectImage = (url) => {
        setSelectedImageUrl(url);
    };
    
    // Function to submit the form and create the article in the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting article with data:", { title, message, category, selectedImageUrl, authorId: userId });

        const { data, error } = await supabase
            .from('articles')
            .insert([
                {
                    title,
                    message,
                    category,
                    image_url: selectedImageUrl,
                    author: userId,
                },
            ]);

        if (error) {
            console.error("Error during the creation of the article:", error);
        }
        else {
            console.log("Article created successfully", data);
            router.push('/articles'); // redirect to the articles page after creating the article
        }
    };


    return (
        <Layout title="New Article" description="Create your article">
            <div className="in-main">
                <h1 className="wt-title">Create your article</h1> 
                <form className="w-full" onSubmit={handleSubmit}> {/* Handle the form submission */}
                    <div>
                        <label htmlFor="title" className="dark:text-white">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="dark:bg-gray-800 dark:border-gray-700 rounded-md dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="dark:text-white">Content</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="dark:text-white">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="car">Car</option>
                            <option value="history">History</option>
                            <option value="technology">Technology</option>
                            <option value="race">Race</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image-search" className="dark:text-white">Search Image</label>
                        <input
                            type="text"
                            id="image-search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="dark:bg-gray-800 dark:border-gray-700 rounded-md dark:text-white"
                        />

                        {/* Display the search results when we click on the button */}
                        <button type="button" onClick={() => searchImages(searchQuery)} className="button-search-image">
                            Search Images
                        </button>
                        <div className="flex flex-wrap gap-4">

                            {images.map(image => (
                                <div
                                    key={image.id}
                                    className="w-60 p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                                    onClick={() => selectImage(image.urls.small)}
                                >
                                    <img key={image.id} src={image.urls.small} alt={image.description} className="w-full h-32 object-cover rounded-md" />
                                </div>

                            ))}
                        </div>
                    </div>
                    
                    {/* Display the selected image*/}
                    {selectedImageUrl && (
                        <div className="selected-image-div">
                            <label className="text-center mt-5 dark:text-white">Selected Image :</label>
                            <div className="selected-image-div2">
                                <img src={selectedImageUrl} alt="Selected" className="w-1/2" />
                            </div>
                            <br></br>
                        </div>
                    )}
                    <button type="submit" className="button-New-Article-Submit">Post my Article</button>
                </form>
            </div>
        </Layout>
    );
}



