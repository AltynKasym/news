import { useState, useEffect } from "react";
import { database } from "../../Database";
import { uid } from "uid";
import { onValue, ref, set, remove, update } from "firebase/database";
import "./createNews.scss";

function CreateNews() {
  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const [profile, setProfile] = useState("");
  const [text, setText] = useState("");

  const handlNewsTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlNewsProfile = (e) => {
    setProfile(e.target.value);
  };

  const handlNewsText = (e) => {
    setText(e.target.value);
  };

  // see news
  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setTitles([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setTitles((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);

  //add news
  function addNews() {
    const nid = uid();
    set(ref(database, `/${nid}`), {
      title,
      profile,
      text,
      nid,
    });
    setTitle("");
    setProfile("");
    setText("");
  }

  //update
  // const handleUpdate = (todo) => {
  //   setIsEdit(true);
  //   setTempUuid(todo.uuid);
  //   setTitle(todo.todo);
  // };

  // const handleSubmitChange = () => {
  //   update(ref(database, `/${tempUuid}`), {
  //     title,
  //     uuid: tempUuid,
  //   });

  //   setTitle("");
  //   setIsEdit(false);
  // };

  //delete
  const handleDelete = (title) => {
    remove(ref(database, `/${title.nid}`));
    console.log(`/${title.nid}`);
    // console.log(data);
  };
  return (
    <div className="addNews">
      <h3>Добавить новость</h3>
      <form className="addNews__form">
        <input
          type="text"
          placeholder="Название"
          className="news-title"
          name="title"
          onChange={handlNewsTitle}
          value={title}
        />

        <select
          className="news-profile"
          required="required"
          name="profile"
          onChange={handlNewsProfile}
          value={profile}
        >
          <option value="">Выберите рубрику</option>
          <option value="business">Бизнес</option>
          <option value="technology">Технология</option>
          <option value="IT">IT</option>
          <option value="Education">Образование</option>
        </select>

        <input
          type="textarea"
          placeholder="Текст"
          className="news-text"
          name="news-text"
          onChange={handlNewsText}
          value={text}
        />
        <input
          type="button"
          className="button"
          value="Отправить"
          onClick={addNews}
        />
      </form>

      {titles.map((item, id) => (
        <div key={id}>
          <h1>{item.title}</h1>
          <button>Update</button>
          <button onClick={() => handleDelete(title)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CreateNews;
