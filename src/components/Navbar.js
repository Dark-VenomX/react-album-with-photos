import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ path, page, handleClick }) => {
  return (
    <div className="navbar">
      <h2 onClick={() => handleClick && handleClick(false)} className="navbar-brand">
        <span className="brand-first-half">ALBUMS</span>
        <span className="brand-last-half">LIST</span>
      </h2>
      <Link to={path} aria-label={`Go to ${page}`}>
        <button className="navbar-btn">{page}</button>
      </Link>
    </div>
  );
};

export default Navbar;
