
import styles from './Card.module.css';

export enum Status {
  Unflipped,
  Flipped,
  Matched
};

export interface CardProps {
  value: number;
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

  return (
  <>
    <div className={cardClass} onClick={onFlip}>
      <div className={styles['card-inner']} onTransitionEnd={onFlipEnd}>
        <div className={styles['card-front']}>
        </div>
        <div className={styles['card-back']}>
          {value}
        </div>
      </div>
    </div> 
  </>
  )
}

export default Card;