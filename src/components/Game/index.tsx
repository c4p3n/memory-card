import { useState } from 'react';
import { Picture } from '../../App';
import Board from '../Board';
import { CardProps, Status } from '../Card';
import Timer from '../Timer';

export interface GameProps {
  pictures: Picture[]
}

function Game({pictures}: GameProps) {

  const cardArray: CardProps[] = []
  const indices: number[] = [];
  const numberOfCards: number = 8;

  // create an array of indices that will be used to shuffle the array of cards
  for (let i = 0; i < numberOfCards; i++) {
    indices.push(i);
  }

  // shuffle the indices array so it can be used to place the cards at random places
  shuffleArray(indices);

  // Add cards 2 at a time to ensure each card has a match
  for (let i = 0; i < numberOfCards; i += 2) {
    let [randomIndex1, randomIndex2] = [indices[i], indices[i+1]];
    let card1: CardProps = {
      value: pictures[i].url,
      status: Status.Unflipped,
      onFlip: () => handleCardClick(randomIndex1),
      onFlipEnd: () => handlePlay(randomIndex1),
    }

    let card2: CardProps = {
      value: pictures[i].url, // this stays the same to ensure there is a matching picture
      status: Status.Unflipped,
      onFlip: () => handleCardClick(randomIndex2),
      onFlipEnd: () => handlePlay(randomIndex2),
    }

    cardArray[randomIndex1] = card1;
    cardArray[randomIndex2] = card2;
  }

  const [currentCards, setCurrentCards] = useState<CardProps[]>(cardArray);
  const isGameWon = currentCards.every((card) => {return card.status === Status.Matched});

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

  return (
    <>
    <div className="Game">
      <Timer isGameWon={isGameWon} />
      <Board currentCards={currentCards} />
    </div>
    </>
  )

}

// Shuffle the elements in an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // generates a random number that is still less than the highest array index
    const j = Math.floor(Math.random() * (i + 1));
    // this uses destructuring to take the element at array[j] and assign it to array[i], and vice versa
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default Game;