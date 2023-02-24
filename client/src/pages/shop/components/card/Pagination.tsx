import btnNext from "../../../../assets/images/buttons/paginationBtnNext.png";
import btnPrev from "../../../../assets/images/buttons/paginationBtnBack.png";

interface PagProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const PaginationComp: React.FC<PagProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  handlePageChange,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++)
    pageNumbers.push(i);

  return (
    <div className='container-pagination'>
      <nav className='pagination-container'>
        <button
          className='pagination-button-next'
          title='pagination prev'
          style={{ backgroundImage: `url(${btnPrev})` }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        ></button>
        <div className='container-buttons-pagination'>
          {pageNumbers.map(number => (
            <button
              key={number + "pagination"}
              title='pagination selector'
              onClick={() => handlePageChange(number)}
              className={`pagination-button ${
                number === currentPage ? "active" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          className='pagination-button-next'
          title='pagination next'
          style={{ backgroundImage: `url(${btnNext})` }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        ></button>
      </nav>
    </div>
  );
};

export default PaginationComp;
