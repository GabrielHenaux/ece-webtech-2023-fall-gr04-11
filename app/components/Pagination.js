import Link from 'next/link';

// Component for displaying pagination
const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination-component">
      {/* Display previous page if current page is greater than 1 */}
      {currentPage > 1 && (
        <Link href={`/articles?page=${currentPage - 1}`} passHref>
          <button className="pagination-button">Previous</button>
        </Link>
      )}

      {/* Display current page number and total number of pages */}
      <span className="pagination-text">{currentPage}/{totalPages}</span>

      {/* Display next page if current page is less than total pages */}
      {currentPage < totalPages && (
        <Link href={`/articles?page=${currentPage + 1}`} passHref>
          <button className="pagination-button">Next</button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
