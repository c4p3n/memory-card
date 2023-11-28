function Timer({time}: {time: number}) {

  if (time > 0) {
    return (
      <p>{time}</p>
    );
  } else {
    return <p>Time's Up!</p>
  }
}

export default Timer;