import { useState } from 'react';
import { CardProps } from '../Card';
import Card from '../Card';
import { Status } from '../Card';
import styles from './Board.module.css';
import { Picture } from '../../App';

function Board({pictures}: {pictures:Picture[]}) {
  const cardArray: CardProps[] = [
    {value: pictures[0].url, status: Status.Unflipped, onFlip: () => handleCardClick(0), onFlipEnd: () => handlePlay(0)},
    {value: pictures[1].url, status: Status.Unflipped, onFlip: () => handleCardClick(1), onFlipEnd: () => handlePlay(1)},
    {value: pictures[2].url, status: Status.Unflipped, onFlip: () => handleCardClick(2), onFlipEnd: () => handlePlay(2)},
    {value: pictures[3].url, status: Status.Unflipped, onFlip: () => handleCardClick(3), onFlipEnd: () => handlePlay(3)},
    {value: pictures[4].url, status: Status.Unflipped, onFlip: () => handleCardClick(4), onFlipEnd: () => handlePlay(4)},
    {value: pictures[5].url, status: Status.Unflipped, onFlip: () => handleCardClick(5), onFlipEnd: () => handlePlay(5)},
    {value: pictures[6].url, status: Status.Unflipped, onFlip: () => handleCardClick(6), onFlipEnd: () => handlePlay(6)},
    {value: pictures[7].url, status: Status.Unflipped, onFlip: () => handleCardClick(7), onFlipEnd: () => handlePlay(7)},
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

  function handleNoMatch() {
    // create a copy of the current cards
    const nextCards = currentCards.slice();
    // filter out the cards that are flipped
    const flippedCards = nextCards.filter((card) => card.status === Status.Flipped);
    // if there is more than one flipped card, they should be flipped back
    if (flippedCards.length === 2) {
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
      cards.push(
      <Card 
      value={currentCards[i].value} 
      status={currentCards[i].status} 
      onFlip={currentCards[i].onFlip}
      onFlipEnd={currentCards[i].onFlipEnd}
      key={i}
      />
      )
    }
    return (
      <>
        {cards}
      </>
    )
  }

  const board = makeBoard();

  return (
      <div className={styles['board-wrapper']}>
        {board}
      </div>
  )

}



export default Board;