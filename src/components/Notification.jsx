
import React, { useEffect } from "react";

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>
        {type === "success" ? "✓" : "!"} {message}
      </span>

      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Notification;
