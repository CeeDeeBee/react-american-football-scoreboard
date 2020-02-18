//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [clock, setClock] = useState({ minutes: '15', seconds: '00' });
  const [quarter, setQuarter] = useState(1);

  useEffect(() => {
    const clockTimeout = setTimeout(() => {
      if (clock.minutes === '00' && clock.seconds === '00') {
        // increase quarter
      } else if (clock.seconds === '00') {
        setClock({
          minutes: clock.minutes <= '10' ? `0${clock.minutes - 1}` : clock.minutes - 1,
          seconds: '59'
        });
      } else {
        setClock({
          minutes: clock.minutes,
          seconds: clock.seconds <= '10' ? `0${clock.seconds - 1}` : clock.seconds - 1
        });
      }
    }, 1000);

    return () => clearTimeout(clockTimeout);
  }, [clock.minutes, clock.seconds]);

  const updateScore = (team, ammount) => {
    team === 'home' ? setHomeScore(homeScore + ammount) : setAwayScore(awayScore + ammount);
  }

  const incrementQuarter = () => {
    setClock({ minutes: '15', seconds: '00' });
    quarter < 4 ? setQuarter(quarter + 1) : setQuarter(1);
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{clock.minutes}:{clock.seconds}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => updateScore('home', 7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={() => updateScore('home', 3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={() => updateScore('away', 7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={() => updateScore('away', 3)}>Away Field Goal</button>
        </div>
        <button className="incrementQuarterButton" onClick={incrementQuarter}>New Quarter</button>
      </section>
    </div>
  );
}

export default App;
