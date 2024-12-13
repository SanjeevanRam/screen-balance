import { useEffect } from "react";

function BreakNotification() {
  useEffect(() => {
    const interval = setInterval(() => {
      alert("Take a break!");
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return null;
}

export default BreakNotification;
