import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { createApi } from 'unsplash-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Unsplash client
const unsplash = createApi({
    accessKey: 'SFWX_WpAKXydFD4ev2muaeLCtjL5lLqnwDxyLH_BmRs',
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
                    title,
                    message,
                    category,
                    image_url: selectedImageUrl,
                },
            ])
            .match({ id: articleId });

        if (error) {
            console.error("Error updating the article:", error);
        } else {
            /*router.push('/articles');*/
        }
    };

    /**
     * Handles the back button click.
     */
    const handleBack = () => {
        /*router.back(); // go back to previous page (article[ID] page)*/
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Content</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="car">Car</option>
                    <option value="history">History</option>
                    <option value="technology">Technology</option>
                    <option value="race">Race</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="image-search">Search Image</label>
                <input
                    type="text"
                    id="image-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={() => searchImages(searchQuery)}>Search Images</button>
                <div>
                    {/* Display search results */}
                    {images.map(image => (
                        <img key={image.id} src={image.urls.small} alt={image.description} onClick={() => setSelectedImageUrl(image.urls.small)} />
                    ))}
                </div>
            </div>
            {/* Display selected image */}
            {selectedImageUrl && (
                <div>
                    <label>Selected Image</label>
                    <img src={selectedImageUrl} alt="Selected" />
                </div>
            )}
            {/* Submit button */}
            <button type="submit">Update Article</button>
        </form>
    );
}
