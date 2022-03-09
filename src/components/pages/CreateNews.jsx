import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import database from "../Database";
// import { timestamp, serverTimestamp } from "firebase";
import "./createNews.scss";

function CreateNews() {
  const initialState = {
    title: "",
    heading: "",
    text: "",
    photo: "",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { title, heading, text, photo, time } = state;

  const { id } = useParams();
  useEffect(() => {
    database.child("newslist").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else setData({});
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const newsSubmit = () => {
    // e.preventDefault();

    // setState({
    //   time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    // });

    if (!title || !heading || !text) {
      alert("Введите данные");
    } else {
      if (!id) {
        database.child("newslist").push(state, (err) => {
          if (err) {
            alert(err);
          } else alert("Новость добавлена");
        });
      } else {
        database.child(`newslist/${id}`).set(state, (err) => {
          if (err) {
            alert(err);
          } else alert("Новость отредактирована");
        });
      }

      // setTimeout(() => navigate.push("/"), 500);
    }

    setState({
      title: "",
      heading: "",
      text: "",
      photo: "",
      time: "",
    });
  };

  return (
    <div className="addNews">
      <h3>{id ? "Редактировать новость" : "Добавить новость"}</h3>
      <div className="addNews__form">
        <form
          className="add-news__form"
          autoComplete="off"
          // onSubmit={() => newsSubmit}
          // onClick={() => newsSubmit()}
        >
          <input
            type="text"
            placeholder="Введите название"
            className="news-data"
            name="title"
            required
            value={title || ""}
            onChange={inputHandler}
          />
          <select
            className="news-data"
            required
            name="heading"
            value={heading || ""}
            onChange={inputHandler}
          >
            <option value="">Выберите рубрику</option>
            <option value="business">Бизнес</option>
            <option value="technology">Технология</option>
            <option value="IT">IT</option>
            <option value="Education">Образование</option>
          </select>

          <textarea
            type="textarea"
            placeholder="Введите текст"
            rows="5"
            className="news-data"
            name="text"
            value={text || ""}
            onChange={inputHandler}
          />
          {/* <input
            type="text"
            style={{ display: "none" }}
            value={(time = "5.45")}
          /> */}
          <div className="button">
            <input
              type="file"
              name="photo"
              value={photo || ""}
              onChange={inputHandler}
            />

            <Link
              to={
                !title || !heading || !text
                  ? "/create-News/"
                  : id
                  ? `/view-news/${id}`
                  : `/view-news/`
              }
            >
              <input
                type="button"
                className="button"
                value={id ? "Сохранить" : "Добавить"}
                onClick={() => newsSubmit()}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
