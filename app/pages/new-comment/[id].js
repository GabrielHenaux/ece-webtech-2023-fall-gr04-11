import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import UserContext from '../../components/UserContext';
import { createClient } from '@supabase/supabase-js';
import supabase from "@/components/supabaseClient";


export default function NewComment() {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to submit a comment.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          article: id,
          message: comment,
          author: user.id
        },
      ]);

    if (error) {
      console.error('Error submitting comment:', error);
    } else {
      console.log('Comment submitted:', data);
      router.push(`/articles/${id}`);
    }
  };
 
  return (
    <Layout title="New Comment" description="Write your comment">
      <div className="in-main">
        <h1 className="wt-subtitle">Write a Comment for Article {id}</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="dark:bg-gray-800 dark:text-white"
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </Layout>
  );
}
