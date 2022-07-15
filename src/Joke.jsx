import "./Joke.css";

const Joke = (props) => {
  const { joke, upVote, downVote } = props;
  const { joke: text, votes } = joke;

  return (
    <li className="joke">
      <div className="joke-buttons">
        <i className="fas fa-arrow-up" onClick={upVote} />
        <span className="joke-votes">{votes}</span>
        <i className="fas fa-arrow-down" onClick={downVote} />
      </div>
      <div className="joke-text">{text}</div>
      <div className="joke-emoji">
        <i className="em em-rolling_on_the_floor_laughing"></i>
      </div>
    </li>
  );
};

export default Joke;
