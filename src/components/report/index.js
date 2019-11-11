import React, { useEffect } from 'react';

function Report({ children, reportData, groupBy = [] }) {
  useEffect(() => {
    console.log('******** DATA PROCESSING *******');
    var groupedData = window.d3.nest()
      .key(function (d) { return d.country; })
      .key(function (d) { return d.city; })
      // .rollup(function (v) {
      //   return window.d3.sum(v, function (d) { return d.sales; });
      // })
      .object(reportData);
    console.log(JSON.stringify(groupedData));

  }, [groupBy])

  return (
    <div className="report">
      {children}
    </div>
  );
}

export default Report;
