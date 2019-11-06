import React, { useState, useEffect } from 'react';

let id = 0;
function Header() {
  const [rows, setRow] = useState([]);

  useEffect(() => {
    console.log(rows);
  });

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDropHeader = (e, location) => {
    e.preventDefault();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at ${location}`);
    let newRow = { id: ++id };
    setRow([...rows, newRow]);
  }

  const onDropRow = (e, location) => {
    e.preventDefault();
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at ${location}`);
    let newRow = { id: ++id };
    setRow([...rows, newRow]);
  }

  return (
    <div className="report-header"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropHeader(e, "header")}>
      <h1>Header</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, "row")}
            className="row report-row edit-mode"></div>
        })
      }
    </div>
  );
}

export default Header;
