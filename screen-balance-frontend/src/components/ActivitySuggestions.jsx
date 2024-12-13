import { useState } from 'react';

const ActivitySuggestions = () => {
  const [activities, setActivities] = useState([
    "Read a book",
    "Go for a walk",
    "Meditate",
  ]);

  const addActivity = () => {
    const newActivity = prompt("Enter a new activity:");
    if (newActivity) {
      setActivities([...activities, newActivity]);
    }
  };

  return (
    <div className="activity-suggestions">
      <h3 className="text-xl font-semibold text-[#4a90e2]">Offline Activities</h3>
      <ul className="list-disc pl-5 mt-4">
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">{activity}</li>
        ))}
      </ul>
      <button
        onClick={addActivity}
        className="button bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add New Activity
      </button>
    </div>
  );
};

export default ActivitySuggestions;
