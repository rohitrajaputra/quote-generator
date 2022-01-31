import React, { useState, useEffect } from "react";
import axios from "axios";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [display, setDisplay] = useState();

  const displayQuote = () => {
    const data = quotes[Math.floor(Math.random() * quotes.length)];
    if (data.author === null) {
      data.author = "Unknown";
    }
    setDisplay(data);
  };

  useEffect(() => {
    const getQuotes = async () => {
      const response = await axios.get("https://type.fit/api/quotes");
      setQuotes(response.data);
      setDisplay(response.data[0]);
    };
    getQuotes();
  }, []);

  const tweetquote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${display.text} - ${display.author}`;
    window.open(twitterUrl, "_blank");
  };

  if (quotes.length > 0) {
    return (
      <div className="ui piled very padded segment">
        <h1 style={{ fontSize: "30px" }}>
          <span style={{ color: "red" }}>Quote</span> Generator
          <span style={{ color: "red", fontSize: "10px" }}>by Rohit</span>
        </h1>
        <p style={{ fontSize: "20px", padding: "25px" }}>
          {display ? display.text : ""}
        </p>
        <p style={{ fontSize: "20px" }}>{display ? display.author : ""}</p>
        <div className="ui right floated button" onClick={displayQuote}>
          Next
        </div>
        <div className="ui left floated blue button" onClick={tweetquote}>
          <i className="twitter icon" />
          Tweet
        </div>
      </div>
    );
  } else {
    return (
      <div className="ui piled very padded loading segment">
        <p></p>
        <p></p>
        <p></p>
      </div>
    );
  }
};

export default Quotes;
