import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import UserContext from '../../components/UserContext';
import supabase from "@/components/supabaseClient";
import Link from 'next/link';


/**
 * Renders the NewComment form.
 * Allows users to write and submit comments for a specific article, only if they are logged in.
 * The users can only submit comments for articles that exist in the database
 * 
 * @returns {JSX.Element} The rendered NewComment component.
 */

export default function NewComment() {

  // State variable for the comment field
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  // Function to submit the comment and create it in the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to submit a comment.');
      return;
    }

    // Insert the comment in the database
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
          <div className="back-to-articles">
              <Link href={`/articles/${id}`}>
              <button>
                  ← Back
              </button>
              </Link>
          </div>
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
