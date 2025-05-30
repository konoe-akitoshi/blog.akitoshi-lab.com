// Note.js
import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const Note = ({ type, children }) => {
  const styles = {
    info: {
      color: 'text-blue-700',
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      icon: <FaInfoCircle className="text-blue-500 mr-2" />,
    },
    warn: {
      color: 'text-yellow-700',
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      icon: <FaExclamationTriangle className="text-yellow-500 mr-2" />,
    },
    alert: {
      color: 'text-red-700',
      bg: 'bg-red-100',
      border: 'border-red-500',
      icon: <FaTimesCircle className="text-red-500 mr-2" />,
    },
  };

  const { color, bg, border, icon } = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start ${bg} ${color} ${border} p-4 border-l-4 rounded shadow-sm mb-4`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">{children}</div>
    </div>
  );
};

export default Note;
