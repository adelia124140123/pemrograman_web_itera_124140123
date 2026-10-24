import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ children, title = '' }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Card;
