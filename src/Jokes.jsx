import { useState, useEffect } from "react";
import axios from "axios";

import Joke from "./Joke";
import "./Jokes.css";

const Jokes = () => {
  // TESTING
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://icanhazdadjoke.com/search`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log(response);
      const data = response.data;
      const rigolos = data.results.map((currentRigolo) => {
        return {
          ...currentRigolo,
          votes: 0,
        };
      });
      setJokes(rigolos);
    })();
  }, []);

  console.log(jokes);

  const handleVote = (id, delta = 1) => {
    const jokesWithVotes = jokes.map((currentJoke) => {
      return currentJoke.id === id ? { ...currentJoke, votes: currentJoke.votes + delta } : currentJoke;
    });
    setJokes(jokesWithVotes);
  };

  return (
    <div className="jokes-container">
      <ul className="jokes__list">
        {jokes.map((currentJoke) => (
          <Joke
            key={currentJoke.id}
            joke={currentJoke}
            upVote={() => {
              handleVote(currentJoke.id);
            }}
            downVote={() => {
              handleVote(currentJoke.id, -1);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default Jokes;
