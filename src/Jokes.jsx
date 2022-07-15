import { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./Jokes.css";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // NOTE: temporary limit of jokes. will reconfigure later
      const limit = 10;
      const response = await axios.get(`https://icanhazdadjoke.com/search?limit=${limit}`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log(response);
      const data = response.data;
      setJokes(data.results);
    };

    fetchData();
  }, []);

  console.log(jokes);

  return (
    <div className="jokes-container">
      <ul className="jokes__list">
        {jokes.map((currentJoke) => (
          <Joke key={currentJoke.id} joke={currentJoke.joke} />
        ))}
      </ul>
    </div>
  );
};

export default Jokes;
