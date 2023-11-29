import { useEffect, useState } from "react";

export interface TimerProps {
  isGameWon: boolean;
}

function Timer({isGameWon}: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  useEffect(() => {
    // stop timer if the game is won
    if (!isGameWon) {
      const timer = setTimeout(() => {
        // Here I use the functional update form of setState. This seems to be generally safer
        // since it does not use timeRemaining directly
        // https://legacy.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isGameWon]); // adding this made it so that the timer did not pause during the card flip transition
  // WHY?


  if (timeRemaining > 0) {
    return (
      <p>{timeRemaining}</p>
    );
  } else {
    return <p>Time's Up!</p>
  }
}

export default Timer;