import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      emoji: '',
    };
  }

  resetState = () => {
    this.setState({
      text: '',
      emoji: '',
    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { text, emoji } = this.state;

    console.log(event);
    this.props.addCardCallback(this.state);
    this.resetState();
  }

  render() {
    const getEmojis = EMOJI_LIST.map((emojiText) => {
        return <option value={emojiText}> {emoji.getUnicode(emojiText)}</option>
      })
    return (
      <form onSubmit={this.onSubmit} className="new-card-form">
        <section className="card__content">
          <header className="new-card-form__header">
            Add more inspiration
          </header>
          <div>
            <label className="new-card-form__form-label" htmlFor="text">Text</label>
            <textarea className="new-card-form__form-textarea" name="text" placeholder="Write something inspirational here!" onChange={this.onFormChange} value={this.state.text}></textarea>
          </div>
          <div>
            <label className="new-card-form__form-label" htmlFor="emoji">Emoji</label>
            <select className="new-card-form__form-select" name="emoji" value={this.state.emoji} onChange={this.onFormChange} >
              {getEmojis}
            </select>
          </div>
          <input className="new-card-form__form-button" type="submit" name="submit" value="Inspire!" />
        </section>
      </form>
    )
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
}

export default NewCardForm;
