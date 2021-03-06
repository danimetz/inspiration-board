import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

  const Card  = (props) => {
    return (
      <div className="card">
        <section className="card__content">
          <p className="card__content-text">{props.text}</p>
          {props.emoji && <p className="card__content-emoji">{emoji.getUnicode(`${props.emoji}`)}</p>}
        </section>
        <button
          type="button"
          className="card__delete"
          aria-label="delete card"
          onClick={() => {props.deleteCardCallback(props.id)}}
        >
          x
        </button>
      </div>
    )
  }

Card.propTypes = {
  id: PropTypes.integer,
  text: PropTypes.string,
  emoji: PropTypes.string,
  deleteCardCallback: PropTypes.func.isRequired,
};

export default Card;
