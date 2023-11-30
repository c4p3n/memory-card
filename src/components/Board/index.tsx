import styles from './Board.module.css';
import { CardProps } from '../Card';
import Card from '../Card';

interface BoardProps {
  currentCards: CardProps[],
  time: number
}

function Board({currentCards, time}: BoardProps) {

  function makeBoard() {
    let cards = [];
    for (let i = 0; i < currentCards.length; i++) {
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

  // When time runs out, disable clicking on the board
  return (
    <div className={time > 0 ? styles['board-wrapper'] : styles['board-wrapper'] + " " + styles['is-disabled']}>
        {board}
      </div>
  )

}

export default Board;