import React from "react";
import "./login.scss";

// Страница аутентификации

function Account() {
  return (
    <div className="account">
      <div className="sign-in">
        Войти
        <form>
          <input type="text" placeholder="login"></input>
          <input type="text" placeholder="password"></input>
          <button type="submit">OK</button>
        </form>
      </div>

      <div className="sign-up">
        Зарегистрироваться
        <form>
          <input type="text" placeholder="login"></input>
          <input type="text" placeholder="password"></input>
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
