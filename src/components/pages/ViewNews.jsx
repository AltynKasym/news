import React from "react";
import { useState, useEffect } from "react";
import database from "../Database";
import { Link, useParams } from "react-router-dom";
import "./newsList.scss";

function ViewNews() {
  const [news, setNews] = useState({});

  const { id } = useParams();

  useEffect(() => {
    database
      .child(`newslist/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNews({ ...snapshot.val() });
        } else setNews({});
      });

    // return () => {
    //   setData({});
    // };
  }, [id]);
  console.log("News", news);
  return (
    <div className="view-news">
      View News
      <div key={id} className="news-item">
        {" "}
        {/* <p>{index + 1}</p> */}
        <div className="news-item__title">
          <div className="news-item__header">
            <p>{news.time}</p>
            <h1>{news.title}</h1>
          </div>
          <p>{news.heading}</p>
        </div>
        <div className="news-item__body">
          <img src={news.photo} alt={news.title} />
          <p>{news.text}</p>
        </div>
      </div>
      <Link to="/view-news">
        <button>На Главную</button>
      </Link>
    </div>
  );
}

export default ViewNews;
