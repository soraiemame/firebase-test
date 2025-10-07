import logo from './logo.svg';
import './App.css';
import Form from './Form';
import { useState } from 'react';

function App() {
  const [randomInfo,setRandomInfo] = useState({});

  const handleButton = async () => {
    const get_response = await fetch(
      "https://my-app-e99de-default-rtdb.firebaseio.com/people.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await get_response.json();
    // 一覧を表示する
    console.log("response is...",data);

    // 「特定の人を表示する」というのがよくわからなかったので、とりあえず適当にランダムな一人を選んで表示させるようにしました
    const keys = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];

    console.log(randomKey);
    setRandomInfo(data[randomKey]);

    // 一人自分で勝手に選んで表示させる場合は以下のようにすればよさそう
    // setRandomInfo(Object.values(data).filter(v => v.name === "hoge"));
  }

  const handleSubmit = async (name, email, age) => {
    console.log("onSubmit:", name, " ", email," ", age);
    const post_response = await fetch(
      "https://my-app-e99de-default-rtdb.firebaseio.com/people.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
        }),
      }
    );
    // POSTの結果を表示
    console.log("response is...", await post_response.json());
    const get_response = await fetch(
      "https://my-app-e99de-default-rtdb.firebaseio.com/people.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 一覧を表示する
    console.log("response is...", await get_response.json());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={handleButton}>Push!</button>
      <div>
        <p>Name: {randomInfo.name}</p>
        <p>Email: {randomInfo.email}</p>
        <p>Age: {randomInfo.age}</p>
        <p>Age + 10: {parseInt(randomInfo.age) + 10}</p>
      </div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
