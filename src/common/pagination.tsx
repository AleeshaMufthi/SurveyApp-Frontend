import React from "react";

const Pagination = ({ page, total, setPage }: { page: number, total: number, setPage: (page: number | "prev" | "next") => void }) => {
    console.log(page, total, 'ssssssssssssssssssssssssssss');
    
    return (
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => setPage("prev")}
          disabled={page === 1}
          className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
  
        <span className="px-4 py-2">{page} / {total}</span>
  
        <button 
          onClick={() => setPage("next")}
          disabled={page === total}
          className={`px-4 py-2 border rounded ${page === total ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;