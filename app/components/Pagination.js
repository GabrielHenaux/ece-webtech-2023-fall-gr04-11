import Link from 'next/link';

/**
 * Renders a pagination component with previous and next buttons.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @returns {JSX.Element} The pagination component.
 */
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
