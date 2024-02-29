import React from 'react'

  const ProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => {
    return (
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700">{label}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };
export default ProgressBar