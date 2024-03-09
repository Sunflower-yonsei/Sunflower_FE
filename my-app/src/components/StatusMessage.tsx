import React from "react";

interface StatusMessageProps {
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "absolute", left: "-9999px", top: "auto" }}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
