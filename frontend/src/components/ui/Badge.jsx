import React from 'react';
const Badge = ({ text, className = "" }) => (
  <span className={`text-xs font-semibold px-2 py-1 bg-accent text-white rounded-full ${className}`}>
    {text}
  </span>
);
export default Badge;