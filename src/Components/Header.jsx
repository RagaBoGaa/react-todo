import { useState } from "react";

import moonIcon from "../assets/icon-moon.svg";
import sunIcon from "../assets/icon-sun.svg";

const Header = () => {
  const [theme, setTheme] = useState("theme-light");

  const handleSwitch = () => {
    const newTheme = theme === "theme-light" ? "theme-dark" : "theme-light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };
  return (
    <div className="todoHeader">
      <h1>TODO</h1>
      <img
        src={theme === "theme-light" ? moonIcon : sunIcon}
        alt="moon/sun icon"
        onClick={handleSwitch}
      />
    </div>
  );
};
export default Header;
