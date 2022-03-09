import { useState, useEffect } from "react";
import database from "../Database";
import { Link } from "react-router-dom";
import { desc } from "firebase/firestore";
import "./newsList.scss";

function NewsList() {
  const [data, setData] = useState({});

  useEffect(() => {
    database
      .child("newslist")
      .orderByChild("time")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else setData({});
      });

    return () => {
      setData({});
    };
  }, []);

  const deleteNews = (id) => {
    if (window.confirm("Вы хотите удалить новость?")) {
      database.child(`newslist/${id}`).remove((err) => {
        if (err) alert("Error");
        // else alert("Новость удалена");
      });
    }
  };
  return (
    <div className="view-news">
      News List
      {Object.keys(data)
        .sort()
        .map((id, index) => {
          return (
            <div key={id} className="news-item">
              <div>
                <Link to={`/view-news/${id}`} className="news-item__title">
                  <p>{data[id].time}</p>
                  <h1>{data[id].title}</h1>
                </Link>
              </div>
              <Link to={`/edit-news/${id}`}>
                <button>Edit</button>
              </Link>
              <Link to="/view-news">
                <button onClick={() => deleteNews(id)}>Delete</button>
              </Link>
              <Link to={`/view-news/${id}`}>
                <button>View</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default NewsList;
