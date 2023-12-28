import Link from 'next/link'
import NewArticleForm from './newArticleForm';
import Layout from '../components/Layout.js'
import { createClient } from '@supabase/supabase-js';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import UserContext from '../components/UserContext';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



export default function Articles({ articles, page, totalPages }) {

  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleNewArticleClick = () => {
    if (!user) {
      // If the user is not logged in, display an alert
      alert('Please log in to create a new article.');
    } else {
      // If the user is logged in, redirect to the new article form
      router.push('/newArticleForm');
    }
  };
  return (
    <Layout title="Articles" description="Generated by create next app">

        
      <h1 className='wt-title'>Ferrari's News Articles</h1>
      
      <div className="w-1/4 mx-auto">
        <div className="flex items-center justify-center mb-5 bg-gray-100 rounded-lg">
          <p className="italic font-bold my-5">Write you own article just here :</p>
          <button onClick={handleNewArticleClick} className="create-article-button">
                New Article
          </button>
        </div>
      </div>
      <ul className="">
        {articles.map(article => (
          <li key={article.id} className="article-component">
            <Link href={`/articles/${article.id}`}>
              <h2 className="article-title">
                {article.title || ' '} {/* replace null by a blank */}
              </h2>
              {article.image_url && (
                <img src={article.image_url} alt={article.title} className="article-image" />
              )}
              <p className="article-info">
                {article.author ? `Written by ${article.author.username}` : ' '}
                {article.created_at ? ` || ${new Date(article.created_at).toLocaleDateString()} - ${new Date(article.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}` : ''}
              </p>
              
              {article.content ? <p className="article-content">{article.content}</p> : ' '}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} />
    </Layout>
  )
}





export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1;
  const articlesPerPage = 5; // number of articles per page
  const { data, error, count } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles (
        username
      )
      image_url
    `, { count: 'exact' }) // count the total number of articles
    .order('created_at', { ascending: false }) // order the articles by descending date : most recent first
    .range((page - 1) * articlesPerPage, page * articlesPerPage - 1); // get the articles for the current page
  
  if (error) {
    console.error('Error fetching articles:', error);
    return { props: { articles: [], page, totalPages: 0 } };
  }

  const totalPages = Math.ceil(count / articlesPerPage); // calculate the total number of pages
  return {
    props: {
      articles: data,
      page,
      totalPages
    }
  };
}
