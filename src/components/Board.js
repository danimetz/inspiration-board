import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    }
  }

  componentDidMount(props) {
    axios.get(`${this.props.url}${this.props.boardName}/cards`)
   .then((response) => {
     const newCards = response.data.map((card) => {
       const newCard = {
         ...card,
       }
       return newCard;
     }); // end of map
     this.setState({
       cards: newCards,
     });
     console.log(this.state.cards)
   })
   .catch((error) => {
     console.log(error.message);
     this.setState({
       errorMessage: error.message
     })
   });
  }

  removeCard = (cardId) => {
    console.log(cardId)
    let deleteIndex = -1;
    const cardList = [...this.state.cards];
    cardList.forEach((card, index) => {
      if (cardId === card.id) {
        deleteIndex = index;
      }
    });

    cardList.splice(deleteIndex, 1);

    this.setState({
      cards: cardList,
    })

    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)


  }

  addCard = (newCard) => {

    const apiPayload = {
      ...newCard,
    }
    console.log(apiPayload);

    axios.post(`${this.props.url}${this.props.boardName}/cards`, apiPayload)

      .then((response) => {
        // What should we do when we know the post request worked?
        console.log('API RESPONSE SUCCESS')

        const {cards} = this.state;


        cards.push(response.data)

        this.setState({
          cards: cards,
        });


      })
      .catch((error) => {
        // What should we do when we know the post request failed?
        // this.setState({
        //
        // });
      });

  }


  render() {
        const getCards = this.state.cards.map((card) => {
            return <Card
              key = {card.card.id}
              id = {card.card.id}
              text = {card.card.text}
              emoji = {card.card.emoji}
              deleteCardCallback={this.removeCard}
              />
          })


    return (
      <div>
        {getCards}
        <NewCardForm addCardCallback={this.addCard}/>
      </div>

    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.istRequired,
};

export default Board;
