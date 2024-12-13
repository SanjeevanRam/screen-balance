import { useState, useEffect } from "react";
import { formatTime, saveToLocalStorage, getFromLocalStorage } from "../utils/helpers";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(getFromLocalStorage("timeLeft") || 5 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          saveToLocalStorage("timeLeft", newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      alert("Break is over! Time to get back to the screen.");
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const resetTimer = () => {
    setTimeLeft(5 * 60);
    saveToLocalStorage("timeLeft", 5 * 60);
    setIsActive(false);
  };

  return (
    <div className="timer-section p-4 bg-white shadow-md rounded-lg w-80" id="breakTimer">
      <h3 className="text-xl font-semibold text-[#4a90e2]">Break Timer</h3>
      <p className="mt-4 text-xl font-semibold">{formatTime(timeLeft)}</p>
      <div className="mt-4 flex gap-4 justify-center">
        <button
          onClick={() => setIsActive(!isActive)}
          className="button bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isActive ? "Pause" : "Start Break"}
        </button>
        <button
          onClick={resetTimer}
          className="button bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
