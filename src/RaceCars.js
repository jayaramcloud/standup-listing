import React, { useState, useEffect } from 'react';
import './RaceCars.css';

function RaceCars() {
  const [carNames, setCarNames] = useState(['Car 1', 'Car 2', 'Car 3', 'Car 4', 'Car 5', 'Car 6', 'Car 7', 'Car 8', 'Car 9', 'Car 10']);
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    // Run the race when the component is first rendered
    runRace();
  }, []);

  function runRace() {
    // Generate random speeds for each car
    const speeds = carNames.map(() => Math.random());
    // Calculate the race results based on the speeds
    const raceResults = carNames.map((car, index) => {
      return {
        name: car,
        time: 10 * speeds[index]
      };
    });
    // Sort the race results by time
    raceResults.sort((a, b) => a.time - b.time);
    // Set the race results in state
    setRaceResults(raceResults);
  }

  function handleCarNameChange(index, newName) {
    // Update the name of the car at the given index
    const updatedCarNames = [...carNames];
    updatedCarNames[index] = newName;
    setCarNames(updatedCarNames);
  }

  return (
    <div className="RaceCars">
      <div className="RaceCars-left">
        <h1>Race Results</h1>
        <ul>
          {raceResults.map((result, index) => (
            <li key={result.name}>{result.name}: {result.time} seconds</li>
          ))}
        </ul>
        <button onClick={runRace}>Run Race</button>
      </div>
      <div className="RaceCars-right">
        <EditCarNames carNames={carNames} onCarNameChange={handleCarNameChange} />
      </div>
    </div>
  );
}

function EditCarNames({ carNames, onCarNameChange }) {
  return (
    <div>
      <h2>Edit Car Names</h2>
      {carNames.map((name, index) => (
        <div key={name}>
          <label htmlFor={`car-${index}`}>{name}</label>
          <input
            id={`car-${index}`}
            type="text"
            value={name}
            onChange={event => onCarNameChange(index, event.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default RaceCars;
