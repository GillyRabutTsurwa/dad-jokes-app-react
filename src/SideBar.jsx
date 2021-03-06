import React from "react";
import "./SideBar.css";

const SideBar = (props) => {
  const { children } = props;

  return (
    <div className="sidebar">
      <h1 className="app-title">
        <span>Dad</span> Jokes
      </h1>
      <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="laughing emoji" />
      <>{children}</>
    </div>
  );
};

export default SideBar;
