import styles from './Card.module.css';

function Card({value}: { value: number }) {
  return (
  <>
    <div className={styles.card}>
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