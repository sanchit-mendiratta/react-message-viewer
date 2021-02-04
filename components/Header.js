import React from "react";
import PropTypes from "prop-types";
import { FaFacebookMessenger, FaArrowDown, FaArrowUp } from "react-icons/fa";

const Header = ({ sortOrder, sortMessages, count, countChange }) => {
  return (
    <header>
      <FaFacebookMessenger />
      <span className="title">Messenger App</span>
      <div className="mpp">
        <label>Messages per page:</label>
        <input
          type="number"
          value={count}
          onInput={ev => countChange(ev.target.value)}
        />
      </div>
      <a className="btn sort-btn" onClick={sortMessages}>
        Date Sent: {sortOrder ? <FaArrowDown /> : <FaArrowUp />}
      </a>
    </header>
  );
};

Header.propTypes = {
  sortOrder: PropTypes.bool,
  sortMessages: PropTypes.func,
  count: PropTypes.number,
  countChange: PropTypes.func
};

export default Header;
