import React, { useState, useEffect } from 'react';

function Pagination() {
  const [items, setItems] = useState([...Array(100).keys()].map((i) => i + 1));
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const totalPages = Math.ceil(items.length / entriesPerPage);
  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div>
      <h1>Pagination Example</h1>
      <label htmlFor="entries">Show entries: </label>
      <select id="entries" onChange={handleEntriesChange}>
        {[5, 10, 50].map((entry) => (
          <option key={entry} value={entry}>
            {entry}
          </option>
        ))}
      </select>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
