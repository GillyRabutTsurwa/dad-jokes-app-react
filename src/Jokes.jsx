import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJokes } from "./store/modules/jokes/jokesSlice";
import axios from "axios";

import Joke from "./Joke";
import "./Jokes.css";

const Jokes = () => {
  // TESTING
  const jokes = useSelector((state) => state.jokes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJokes());

    console.log(jokes);
  }, []);

  console.log(jokes);

  // NOTE: doesn't work after including redux, so will comment out
  // const handleVote = (id, delta = 1) => {
  //   const jokesWithVotes = jokes.jokes.map((currentJoke) => {
  //     return currentJoke.id === id ? { ...currentJoke, votes: currentJoke.votes + delta } : currentJoke;
  //   });
  //   jokes.jokes = jokesWithVotes;
  // };

  return (
    <div className="jokes-container">
      <ul className="jokes__list">
        {jokes.jokes.map((currentJoke) => (
          // <Joke
          //   key={currentJoke.id}
          //   joke={currentJoke}
          //   upVote={() => {
          //     handleVote(currentJoke.id);
          //   }}
          //   downVote={() => {
          //     handleVote(currentJoke.id, -1);
          //   }}
          // />
          <Joke key={currentJoke.id} joke={currentJoke} />
        ))}
      </ul>
    </div>
  );
};

export default Jokes;
