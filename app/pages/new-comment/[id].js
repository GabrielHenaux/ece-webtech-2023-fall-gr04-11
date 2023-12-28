import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import UserContext from '../../components/UserContext';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
        <h1>Write a Comment for Article {id}</h1>id
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </Layout>
  );
}
