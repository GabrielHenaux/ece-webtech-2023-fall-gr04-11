import Link from 'next/link';
import Layout from '../../components/Layout.js';
import { useRouter } from 'next/router'; 
import { createClient } from '@supabase/supabase-js';
import UserContext from '../../components/UserContext.js';
import {useContext} from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ArticlePage({ article, comments}) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const userId = user?.id;
 

  // function to delete an article
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .match({ id: article.id });
  
      if (error) {
        console.error('Error deleting article:', error);
      } else {
        router.push('/articles'); // go back to the articles page after deleting
      }
    }
  };

  // function to edit an article
  const handleEdit = () => {
    router.push(`/edit-article/${article.id}`); 
  };

  // function to write a new comment
  const handleWriteCommentClick = () => {
    if (user) {
      router.push(`/new-comment/${article.id}`); 
    } else {
      alert('Please log in to write a comment.');
    }
  };

  // Function to delete a comment
const handleDeleteComment = async (commentId) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .match({ id: commentId });

    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      // Refresh the comments or page to reflect the deletion
      router.replace(router.asPath);
    }
  }
};


  

  return (
    <Layout
    
      title={article.title || ' '}
      description="Generated by create next app"
    >
      <div className="in-main">
        <div className="back-to-articles">
          <Link href="/articles">
            <button>
              ← Back
            </button>
          </Link>
        </div>
        <div className="">
          <h1 className='wt-title'>{article.title || ' '}</h1>
          <p className="article-info2">
            {article.author ? `Written by ${article.author.username}` : ' '}
            {article.created_at ? ` - ${new Date(article.created_at).toLocaleDateString()}` : ' '}
          </p>
          {article.image_url && (
            <img src={article.image_url} alt={article.title} className="article-image" />
          )}
          <div className="div-article-content">
            <div className="article-content">
              {article.message || ' '} {/* replace null by a blank if there is no content */}
            </div>
          </div>
        </div>
        <div className="div-class-edit">
          {user && userId === article.author.id && (
            <>
              <button onClick={handleEdit} className="edit-article-button">
                ✍ Edit
              </button>
              <button onClick={handleDelete} className="delete-article-button">
                ✖ Delete
              </button>
            </>
          )}
        </div>

        <div className="comment-section">
          <button onClick={handleWriteCommentClick} className="write-comment-button">
            Write a Comment
          </button>
          <h2 className="comment-name-section">Comments ({comments.length}):</h2>
          
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="flex items centers justify-between">
                
                <p className="comment-author">{comment.author ? `${comment.author.username}` : 'Unknown'}</p>
                {user && userId === comment.author.id && (
                  <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-button">
                    ✖
                  </button>
                )}
              </div>
              <p className="comment-message">{comment.message}</p>
              
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}


export async function getStaticProps(ctx) {
  const { id } = ctx.params;
  // Fetch article
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles (
        username,
        id
      )
    `)
    .eq('id', id)
    .single();

  // Fetch comments for the article
  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select(`
      id,
      message,
      created_at,
      author:profiles (
        username,
        id
      )
    `)
    .eq('article', id);

  if (articleError) {
    console.error('Error fetching article:', articleError);
  }

  if (commentsError) {
    console.error('Error fetching comments:', commentsError);

  }

  return {
    props: {
      article: article || {},
      comments: comments || []
    }
  };
}





export async function getStaticPaths() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id');

  if (error || !articles) {
    console.error('Error fetching articles:', error);
    return { paths: [], fallback: false };
  }

  return {
    paths: articles.map(article => ({ params: { id: article.id.toString() } })),
    fallback: false
  };
}
