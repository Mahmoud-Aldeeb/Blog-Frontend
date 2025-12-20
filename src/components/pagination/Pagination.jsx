import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  // const [activePage, setActivePage] = useState(currentPage);

  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const handlePageChange = (page) => {
  //   if (page < 1 || page > totalPages || page === activePage) return;

  //   setActivePage(page);
  //   if (onPageChange) onPageChange(page);

  //   // Scroll to top smoothly
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // const getPageNumbers = () => {
  //   const pages = [];
  //   const maxVisiblePages = 5;

  //   if (totalPages <= maxVisiblePages) {
  //     // Show all pages if total pages are less than max visible
  //     for (let i = 1; i <= totalPages; i++) {
  //       pages.push(i);
  //     }
  //   } else {
  //     // Always show first page
  //     pages.push(1);

  //     // Calculate start and end of visible pages
  //     let start = Math.max(2, activePage - 1);
  //     let end = Math.min(totalPages - 1, activePage + 1);

  //     // Adjust if near start
  //     if (activePage <= 3) {
  //       end = 4;
  //     }

  //     // Adjust if near end
  //     if (activePage >= totalPages - 2) {
  //       start = totalPages - 3;
  //     }

  //     // Add ellipsis after first page if needed
  //     if (start > 2) {
  //       pages.push("...");
  //     }

  //     // Add middle pages
  //     for (let i = start; i <= end; i++) {
  //       pages.push(i);
  //     }

  //     // Add ellipsis before last page if needed
  //     if (end < totalPages - 1) {
  //       pages.push("...");
  //     }

  //     // Always show last page
  //     if (totalPages > 1) {
  //       pages.push(totalPages);
  //     }
  //   }

  //   return pages;
  // };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button
          className={`pagination-btn prev-btn ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            if (currentPage > 1) {
              handlePageClick(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        >
          <i className="bi bi-chevron-left"></i>
          <span>Previous</span>
        </button>

        <div className="page-numbers">
          {generatedPages.map((page) => (
            <button
              key={page}
              className={`page-number ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`pagination-btn next-btn ${
            currentPage === pages ? "disabled" : ""
          }`}
          onClick={() => {
            if (currentPage < pages) {
              handlePageClick(currentPage + 1);
            }
          }}
          disabled={currentPage === pages}
        >
          <span>Next</span>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
