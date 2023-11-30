export interface TimerProps {
  time: number;
}

function Timer({time}: TimerProps) {

  if (time > 0) {
    return (
      <p>{time}</p>
    );
  } else {
    return <p>Time's Up!</p>
  }
}

export default Timer;