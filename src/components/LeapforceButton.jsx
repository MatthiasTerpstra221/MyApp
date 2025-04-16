import React from 'react';

const LeapforceButton = () => {
  const handleClick = () => {
    window.open('https://leapforce.nl/', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-500 rounded-md shadow-sm hover:bg-orange-50 transition-colors duration-200"
      aria-label="Visit Leapforce website"
    >
      <img 
        src="/leapforce-logo.png" 
        alt="Leapforce Logo" 
        className="h-6"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
        }}
      />
      <span className="font-medium text-orange-600">Visit Leapforce</span>
    </button>
  );
};

export default LeapforceButton; 