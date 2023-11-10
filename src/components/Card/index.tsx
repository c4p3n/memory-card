
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
          {value}
        </div>
        <div className={styles['card-back']}>
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div> 
  </>
  )
}

export default Card;