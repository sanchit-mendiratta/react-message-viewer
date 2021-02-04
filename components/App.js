import React, { useState, useEffect } from "react";
import Message from "./Message";
import Header from "./Header";
import Footer from "./Footer";
import { messagesData } from "../data/messages.json";
import { CONSTANTS } from "../data/constants.json";

const App = () => {
  // Set the state
  const [page, setPage] = useState(0);
  const [newFetch, setNewFetch] = useState(true);
  const [count, setCount] = useState(CONSTANTS.MESSAGES_PER_PAGE);
  const [sortOrder, setSortOrder] = useState(true);
  /**
   * In a real application the messagesData will come from
   * backend via API call and we will use useEffect hook
   * to store the data in the state.
   */
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log(newFetch);
    if (newFetch) {
      fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${
          messages.length
        }&_limit=${count}`
      )
        .then(res => res.json())
        .then(data => setMessages([...messages, ...data]));
    }
  }, [page]);

  // To control the number of rows to be displayed on UI
  let root = document.documentElement;
  root.style.setProperty("--count", count);

  // On countChange from header
  const countChange = val => {
    setCount(parseInt(val));
    // update css var to calculate height of rows
    root.style.setProperty("--count", val);
  };

  // Function to go to next page
  const nextPage = () => {
    // check if we are on last page
    setNewFetch(true);
    setPage(page + 1);
  };
  // Function to go to prev page
  const prevPage = () => {
    // check if we are on first page
    if (page == 0) return;
    setNewFetch(false);
    setPage(page - 1);
  };
  // Function to handle message delete
  const removeMessage = message => {
    // find index of message to be deleted
    let index = messages.findIndex(
      mess =>
        mess.senderUuid == message.senderUuid && mess.content == message.content
    );
    // creating copy so as to not alter state var directly
    const copy = [...messages];
    copy.splice(index, 1);
    setMessages(copy);
  };

  // deduplicate messages if the `uuid` and `content` are the same.
  let filteredMessages = messages.filter(
    (message, index) =>
      messages.findIndex(
        mess => mess.postId == message.postId && mess.body == message.body
      ) == index
  );

  // Sort the filtered messages based on sentAt Date
  filteredMessages = filteredMessages.sort((m1, m2) => {
    let date1 = new Date(m1.sentAt);
    let date2 = new Date(m2.sentAt);
    return sortOrder ? date1 - date2 : date2 - date1;
  });

  // Set startIndex
  let startIndex = count * page;
  // Set number of messages per page
  let numberOfMessages = count;
  // Handle reaching last page
  if (startIndex + count > filteredMessages.length) {
    numberOfMessages = filteredMessages.length - startIndex;
  }
  // messageList to be displayed on UI
  let messageList = filteredMessages.splice(startIndex, numberOfMessages);

  return (
    <div className="container">
      <Header
        sortOrder={sortOrder}
        sortMessages={() => setSortOrder(!sortOrder)}
        countChange={countChange}
        count={count}
      />
      {messageList.length ? (
        <ul className="messages">
          {messageList.map((message, index) => (
            <Message
              key={index}
              message={message}
              removeMessage={removeMessage}
            />
          ))}
        </ul>
      ) : (
        <div className="messages">No more messages to display here.</div>
      )}
      <Footer pageNumber={page + 1} nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
};

export default App;
