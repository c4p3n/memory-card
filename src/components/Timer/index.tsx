import { useState, useEffect } from "react";

function Timer() {
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Here I use the functional update form of setState. This seems to be generally safer
      // since it does not use timeRemaining directly
      // https://legacy.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
      setTimeRemaining(prevTime => prevTime - 1)
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (timeRemaining > 0) {
    return (
      <p>{timeRemaining}</p>
    );
  } else {
    return <p>Time's Up!</p>
  }
}

export default Timer;