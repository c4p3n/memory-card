import { useState } from 'react';
import { CardProps } from '../Card';
import Card from '../Card';
import { Status } from '../Card';

function Board() {
  const cardArray: CardProps[] = [
    {value: 2, status: Status.Unflipped, onFlip: () => handleCardClick(0)},
    {value: 1, status: Status.Unflipped, onFlip: () => handleCardClick(1)},
    {value: 3, status: Status.Unflipped, onFlip: () => handleCardClick(2)},
    {value: 1, status: Status.Unflipped, onFlip: () => handleCardClick(3)},
    {value: 3, status: Status.Unflipped, onFlip: () => handleCardClick(4)},
    {value: 2, status: Status.Unflipped, onFlip: () => handleCardClick(5)},
  ]

  const [currentCards, setCurrentCards] = useState<CardProps[]>(cardArray);
  
  function handleCardClick(index: number) {
    // make a copy of the card array
    const nextCards = currentCards.slice();
    // flip an unflipped card
    // if card is already flipped, don't allow player to flip it back
    if (nextCards[index].status === Status.Unflipped) {
      nextCards[index].status = Status.Flipped;
    }
    // set the card state to reflect the affected card
    setCurrentCards(nextCards);
    handlePlay(index);
  }

  function handlePlay(lastCardClicked: number) {
    let matchFound: number = -1;
    // first check if the last card clicked is being flipped to front or back
    if (currentCards[lastCardClicked].status === Status.Flipped) {
      // save the card's value
      const lastFlippedCardValue = currentCards[lastCardClicked].value;
      // Is there another card that:
      // 1. Is not the last card clicked
      // 2. matches the value of the last card clicked
      // 3. has also been flipped
      matchFound = currentCards.findIndex((card, index) => 
        index !== lastCardClicked && card.value === lastFlippedCardValue && card.status === Status.Flipped
      )
    }

    if (matchFound > -1) {
      handleMatchedCards(lastCardClicked, matchFound);
    } else {
      handleNoMatch();
    }
  }

  function handleMatchedCards(lastCardClicked: number, matchedCard: number) {
    const nextCards = currentCards.slice();
    nextCards[lastCardClicked].status = Status.Matched;
    nextCards[matchedCard].status = Status.Matched;
    setCurrentCards(nextCards);
  }

   // TODO: If the second card is not a match both cards should flip back over automatically with animation

  function handleNoMatch() {
    // create a copy of the current cards
    const nextCards = currentCards.slice();
    // filter out the cards that are flipped
    const flippedCards = nextCards.filter((card) => card.status === Status.Flipped);
    // if there is more than one flipped card, they should be flipped back
    if (flippedCards.length > 2) {
      flippedCards.forEach((card) => {
        if (card.status === Status.Flipped) {
          card.status = Status.Unflipped;
        }
      });
    }
    setCurrentCards(nextCards);
  }

  function makeBoard() {
    let cards = [];
    for (let i = 0; i < cardArray.length; i++) {
      cards.push(<Card 
        value={currentCards[i].value} 
        status={currentCards[i].status} 
        onFlip={currentCards[i].onFlip}
        key={i}
        />)
    }
    return (
      <>
        {cards}
      </>
    )
  }

  const board = makeBoard();

  return (
      <div className="board-row">
        {board}
      </div>
  )

}



export default Board;