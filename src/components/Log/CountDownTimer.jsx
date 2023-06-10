import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ duration }) => {
  const targetDate = new Date().getTime() + duration * 1000;

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  const handleCountdownComplete = () => {
    window.location.reload();
  };

  return (
    <>
      <Countdown date={targetDate} renderer={renderer} onComplete={handleCountdownComplete} />
    </>
  );
};

export default CountdownTimer;
