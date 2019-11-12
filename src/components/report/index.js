import React from 'react';

function Report({ children, reportData, groupBy = [] }) {
  return (
    <div className="report">
      {children}
    </div>
  );
}

export default Report;
