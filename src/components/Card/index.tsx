
import { useState } from 'react';
import styles from './Card.module.css';

function Card({value}: { value: number }) {
  const [cardClass, setCardClass] = useState(styles.card);
  // if the card is not flipped, it will have styles.card as its class
  const isCardFlipped = cardClass === styles.card ? false : true;

  function onCardClick() {
    if (!isCardFlipped) {
      setCardClass(styles.card + " " + styles['card-flip']);
    } else {
      setCardClass(styles.card);
    }
  }

  return (
  <>
    <div className={cardClass} onClick={onCardClick}>
      <div className={styles['card-inner']}>
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