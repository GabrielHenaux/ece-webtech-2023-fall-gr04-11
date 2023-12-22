// components/new_article_form.js
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NewArticleForm() {
  const [title, setTitle] = useState('');
  const [message, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, message });

    // post the article on supabase
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {title,message} 
    ]);

    if (error) {
      console.error("Error during the creation of the article:", error);
    } 
    else {
      // go back to the articles page after posting the article
      router.push('/articles');    }
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
      <button type="submit">Post my Article</button>
    </form>
  );
}
