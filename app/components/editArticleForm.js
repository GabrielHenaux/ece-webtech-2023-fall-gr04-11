import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { createApi } from 'unsplash-js';
import supabase from "@/components/supabaseClient";
import Layout from './Layout';

// Initialize Unsplash client
const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});
 
/**
 * EditArticleForm component for editing an article.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.articleId - The ID of the article to be edited.
 * @returns {JSX.Element} The rendered EditArticleForm component.
 */
export default function EditArticleForm({ articleId }) {
    // State variables
    const [title, setTitle] = useState('');
    const [message, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Load article data
    useEffect(() => {
        /**
         * Fetches the article data from the database.
         */
        const fetchArticle = async () => {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', articleId)
                .single();

            if (error) {
                console.error('Error fetching article:', error);
            } else {
                setTitle(data.title);
                setContent(data.message);
                setCategory(data.category);
                setSelectedImageUrl(data.image_url);
            }
        };

        fetchArticle();
    }, [articleId]);

    /**
     * Searches for images from Unsplash based on the given query.
     * 
     * @param {string} query - The search query.
     */
    const searchImages = async (query) => {
        const response = await unsplash.search.getPhotos({ query });
        if (response.status === 200) {
            setImages(response.response.results);
        } else {
            console.error("Error fetching images:", response);
        }
    };

    /**
     * Handles the form submission.
     * 
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
            .from('articles')
            .update([
                {
                    title, // Update the article title
                    message, // Update the article content
                    category, // Update the category
                    image_url: selectedImageUrl, // Update the image URL
                    created_at: new Date().toISOString(), // Update the timestamp
                },
            ])
            .match({ id: articleId });

        if (error) {
            console.error("Error updating the article:", error);
        } else {
            router.push('/articles'); // Redirect to the articles list
        }
    };

  
    return (
        <Layout>
            <h1 className="wt-title">Edit your article</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="dark:bg-gray-800 dark:border-gray-700 rounded-md dark:text-white"
                    />
                    <button type="button" onClick={() => searchImages(searchQuery)} className="button-search-image">Search Images</button>
                    <div className="flex flex-wrap gap-4">
                            
                        {images.map(image => (
                            <div
                                key={image.id}
                                className="w-60 p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                                onClick={() => selectImage(image.urls.small)}
                            >
                                <img key={image.id} src={image.urls.small} alt={image.description} className="w-full h-32 object-cover rounded-md"/>
                            </div>
                            
                        ))}
                    </div>
                </div>
                {/* Display selected image */}
                {selectedImageUrl && (
                    <div className="selected-image-div">
                        <label className="text-center mt-5 dark:text-white">Selected Image :</label>
                        <div className="selected-image-div2">
                            <img src={selectedImageUrl} alt="Selected" className="w-1/2"/>
                        </div>
                        <br></br>
                    </div>
                )}
                {/* Submit button */}
                <button type="submit">Update Article</button>
            </form>
        </Layout>
        
    );
}
