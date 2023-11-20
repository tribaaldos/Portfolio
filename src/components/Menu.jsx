export const Menu = () => {
  return (
    <div className="menu">
      <img className="menu__logo" src="favicon.ico" alt="logo" />
      <div className="menu__buttons">
        <a className="menu__button" href="#home">
          Home
        </a>
        <a className="menu__button" href="#skills">
          Skills
        </a>
        <a className="menu__button" href="#projects">
          Projects
        </a>
        <a className="menu__button" href="#contact">
          Contact
        </a>
        <a className="menu__button" href="https://docs.google.com/document/d/1oLnyRznAA6aT5bjnZtNBFYMbaIbmo3U50mzJg-54Xz8/edit" target="_blank">
          Resume
        </a>
      </div>
    </div>
  );
};
