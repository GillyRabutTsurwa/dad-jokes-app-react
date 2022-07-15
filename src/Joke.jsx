const Joke = (props) => {
  // NOTE: now passing the entire joke object as a prop...
  const { joke, upVote, downVote } = props;

  /**
   * NOTE:
   * and thus i am destructuring it again
   * also, i am giving the joke property a new name to use: text for extra clarity...
   * ...because a joke property from an object with the same name is a bit confusing
   */
  const { joke: text, votes } = joke;

  return (
    <li>
      <div className="joke-buttons">
        <i className="fas fa-arrow-up" onClick={upVote} />
        <span>{votes}</span>
        <i className="fas fa-arrow-down" onClick={downVote} />
      </div>
      <div className="joke-text">{text}</div>
    </li>
  );
};

export default Joke;
