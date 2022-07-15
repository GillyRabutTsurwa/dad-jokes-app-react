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
      const rigolos = data.results.map((currentRigolo) => {
        return {
          /**
           * NOTE:
           * ici, on veut ajouter un propietaire "custom" qui ne se trouve pas, par defaut, à l'objet
           * on va donc utiliser le "spread operator", pour appliquer les propietaires existantes dans un nouvel objet
           * et aussi ajouter un nouveau propietaire (votes)
           * on verifiant au console, ça marche bien
           */
          ...currentRigolo,
          votes: 0,
        };
      });
      setJokes(rigolos);
    };

    fetchData();
  }, []);

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
          // NOTE: this didn't work. this is why: https://stackoverflow.com/questions/64626366/why-does-setting-state-in-child-component-onclick-cause-recursive-loop-even-when
          // <Joke key={currentJoke.id} joke={currentJoke} upVote={handleVote(currentJoke.id)} />

          //   NOTE: this works comme l'on veut
          <Joke
            key={currentJoke.id}
            joke={currentJoke}
            /**
             * NOTE i'm not adding (+)1 as the second parametre here, as I do with downvote because I have 1 as the default parametre
             * so with the default parametre (see actual function), i am not doing this: handleVote(currentJoke.id, 1)
             * 1 is the default parametre, so if no parametre is specified, 1 will be implicitly applied
             */
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
