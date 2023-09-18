import { useState, useEffect } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      setStartTime(Date.now() - elapsedTime);
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, elapsedTime, startTime]);

  const formatTime = () => {
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formatMilliseconds = milliseconds.toString().padStart(3, "0");

    return (
      <div className="text-4xl">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}.
        <span className="text-xl">{formatMilliseconds}</span>
      </div>
    );
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center text-center text-white bg-gray-800">
      <h1 className="text-5xl mb-10">Stopwatch App</h1>
      {formatTime()}
      <div className="mt-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
            isRunning ? "bg-red-500 hover:bg-red-600" : ""
          }`}
          onClick={startStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
