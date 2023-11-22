
import styles from './Card.module.css';

export enum Status {
  Unflipped,
  Flipped,
  Matched
};

export interface CardProps {
  value: string;
  status: Status;
  onFlip: () => void;
  onFlipEnd: () => void;
};

function Card({ value, status, onFlip, onFlipEnd }: CardProps) {
  function makeCardClass(status: Status) {
    if (status === Status.Matched) {
      return styles.card + " " + styles['card-matched'];
    } else if (status === Status.Flipped) {
      return styles.card + " " + styles['card-flip'];
    } else {
      return styles.card;
    }
  }

  const cardClass = makeCardClass(status);

  // TODO: Change the hardcoded height and width, and alt-text
  return (
  <>
    <div className={cardClass} onClick={onFlip}>
      <div className={styles['card-inner']} onTransitionEnd={onFlipEnd}>
        <div className={styles['card-front']}>
        </div>
        <div className={styles['card-back']}>
          <img src={value} alt="A good boy" height="300px" width="200px" /> 
        </div>
      </div>
    </div> 
  </>
  )
}

export default Card;