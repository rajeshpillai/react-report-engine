import React from 'react';

function Header() {
  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, location) => {
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at ${location}`);
  }

  return (
    <div className="report-header"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, "header")}>
      <h1>Header</h1>
    </div>
  );
}

export default Header;
