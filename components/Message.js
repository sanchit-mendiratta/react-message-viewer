import React from "react";
import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import Moment from "react-moment";

/**
 * Displays a message with its
 * `content`, `senderUuid`, and `sentAt` properties.
 */
const Message = ({ message, removeMessage }) => {
  return (
    <li>
      <div className="message-area">
        <p>
          Message: <strong>{message.body}</strong>
        </p>
        <p>
          From: <strong>{message.email}</strong>
        </p>
        <p>
          on{" "}
          <Moment format="ddd MMM DD, YYYY \at hh:mm a">
            {message.sentAt}
          </Moment>
        </p>
      </div>
      <div className="edit-area">
        <FaRegTrashAlt onClick={() => removeMessage(message)} />
      </div>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.object,
  removeMessage: PropTypes.func
};

export default Message;
