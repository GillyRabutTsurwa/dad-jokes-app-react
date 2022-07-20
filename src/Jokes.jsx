import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJokes, vote } from "./store/modules/jokes/jokesSlice";

import Joke from "./Joke";
import "./Jokes.css";

const Jokes = () => {
  // TESTING
  const { error, jokes, loading } = useSelector((state) => state.jokes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJokes());
  }, []);

  return (
    <div className="jokes-container">
      <ul className="jokes__list">
        {jokes.map((currentJoke) => (
          <Joke
            key={currentJoke.id}
            joke={currentJoke}
            upVote={() => {
              // dispatch(vote(currentJoke, 1));
              dispatch(vote({ currentJoke: currentJoke, delta: 1 }));
            }}
            downVote={() => {
              // dispatch(vote(currentJoke, -1));
              dispatch(vote({ currentJoke: currentJoke, delta: -1 }));
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default Jokes;
