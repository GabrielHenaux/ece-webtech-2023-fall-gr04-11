import EditArticleForm from '../../components/editArticleForm';

export default function EditArticle({ query }) {
  return (
    <EditArticleForm articleId={query.id} />
  );
}

// this function is recup the id of the article and send it to the component EditArticleForm
export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
