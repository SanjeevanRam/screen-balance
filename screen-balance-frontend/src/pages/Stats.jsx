import { useState, useEffect } from 'react';

const Stats = () => {
  const [completedActivities, setCompletedActivities] = useState(0);
  const [completedBreaks, setCompletedBreaks] = useState(0);

  useEffect(() => {
  }, [completedActivities, completedBreaks]);

  return (
    <div className="stats-section p-4 bg-white shadow-md rounded-lg w-full " id="stats">
      <h3 className="text-xl font-semibold text-[#4a90e2]">Your Stats</h3>
      <div className="mt-4 text-xl">
        <p className="font-semibold">Completed Activities: {completedActivities}</p>
        <p className="font-semibold">Completed Breaks: {completedBreaks}</p>
      </div>
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => setCompletedActivities(completedActivities + 1)}
          className="button bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Activity
        </button>
        <button
          onClick={() => setCompletedBreaks(completedBreaks + 1)}
          className="button bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Break
        </button>
      </div>
    </div>
  );
};

export default Stats;
