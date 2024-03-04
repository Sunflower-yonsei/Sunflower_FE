import React from "react";

interface ProgressStatusProps {
  progress: number;
  label: string;
}

const ProgressStatus: React.FC<ProgressStatusProps> = ({ progress, label }) => {
  const fillColor = progress === 100 ? "#10B981" : "#9CA3AF";

  return (
    <div className="mb-4 flex items-center">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="2" fill={fillColor} />
        {progress === 100 && (
          <path
            fill="white"
            d="M9 11.3l2.3 2.3 4.5-4.5 1.4 1.4-5.9 5.9-3.7-3.7 1.4-1.4z"
          />
        )}
      </svg>
      <div className="ml-2 text-sm font-medium text-gray-700">
        {progress === 100 ? `${label} Done` : `${label} Processing...`}
      </div>
    </div>
  );
};

export default ProgressStatus;
