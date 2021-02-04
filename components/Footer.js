import React from "react";

const Footer = ({ pageNumber, nextPage, prevPage }) => {
  return (
    <footer>
      <a className="btn prev-btn" onClick={() => prevPage()}>
        Prev Page
      </a>
      <span className="pageNumber">{pageNumber}</span>
      <a className="btn next-btn" onClick={() => nextPage()}>
        Next Page
      </a>
    </footer>
  );
};

export default Footer;
