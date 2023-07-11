import React, { useEffect, useState } from "react";
// import Pagination from "react-pagination-library";
// import "react-pagination-library/build/css/index.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationBox(props) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    props.changePages(currentPage);
  }, [currentPage]);
  return (
    <div id="pagin">
      {/* <Pagination
      currentPage={currentPage}
      totalPages={props.totalPages}
      changeCurrentPage={setCurrentPage}
      theme="circle"
    /> */}
      <Pagination
        onChange={(e) => setCurrentPage(e.target.textContent)}
        count={props.totalPages}
        color="primary"
      />
    </div>
  );
}

export default PaginationBox;
