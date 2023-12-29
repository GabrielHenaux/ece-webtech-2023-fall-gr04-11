import EditArticleForm from '../../components/editArticleForm';

/**
 * Renders the EditArticle function.
 * This page is only accessible to logged in users and only if they are the author of the article.
 * The function calls the EditArticleForm component and passes the article ID to it.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.query - The query object containing the article ID.
 * @returns {JSX.Element} The rendered EditArticleForm component.
 */

export default function EditArticle({ query }) {
  return (
    <EditArticleForm articleId={query.id} /> // Passes the article ID to the EditArticleForm component
  );
}

// this function is used to recup the id of the article and send it to the component EditArticleForm
export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
