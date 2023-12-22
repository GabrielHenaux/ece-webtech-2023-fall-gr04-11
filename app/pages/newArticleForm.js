import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NewArticleForm() {
  const [title, setTitle] = useState('');
  const [message, setContent] = useState('');
  const [category, setCategory] = useState('car'); // Initial category set to 'car'
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, message, category });

    // Post the article on supabase with the selected category
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          message,
          category, // Include the selected category in the insert
        },
      ]);

    if (error) {
      console.error("Error during the creation of the article:", error);
    } else {
      // Go back to the articles page after posting the article
      router.push('/articles');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <option value="technologie">Technologie</option>
          <option value="race">Race</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit">Post my Article</button>
    </form>
  );
}
