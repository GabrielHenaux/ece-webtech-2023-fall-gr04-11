import { useState, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { createApi } from 'unsplash-js';
import UserContext from '../components/UserContext';
import supabase from "@/components/supabaseClient";


// Initialize Unsplash client
const unsplash = createApi({
    accessKey: 'SFWX_WpAKXydFD4ev2muaeLCtjL5lLqnwDxyLH_BmRs',
});


export default function NewArticleForm() {
    const [title, setTitle] = useState('');
    const [message, setContent] = useState('');
    const [category, setCategory] = useState('car');
    const [images, setImages] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

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


    const selectImage = (url) => {
        setSelectedImageUrl(url);
    };
    
    
    const { user } = useContext(UserContext);
    const userId = user?.id;
    

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
            router.push('/articles');
        }
    };

    
    return (
        <Layout title="New Article" description="Create your article">
            <div className="in-main">
                <h1 className="wt-title">Create your article</h1>
                <form className="w-full" onSubmit={handleSubmit}>
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        

                        <button type="button" onClick={() => searchImages(searchQuery)} className="bg-gray-100 text-black px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-gray-200 mb-3">
                            Search Images
                        </button>
                        <div className="flex flex-wrap gap-4">
                            
                            {images.map(image => (
                                <div
                                    key={image.id}
                                    className="w-60 p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-200"
                                    onClick={() => selectImage(image.urls.small)}
                                >
                                    <img key={image.id} src={image.urls.small} alt={image.description} className="w-full h-32 object-cover rounded-md"/>
                                </div>
                                
                            ))}
                        </div>
                    </div>

                    {selectedImageUrl && (
                        <div className="selected-image-div">
                            <label className="text-center mt-5 ">Selected Image :</label>
                            <div className="selected-image-div2">
                                <img src={selectedImageUrl} alt="Selected" className="w-1/2"/>
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



