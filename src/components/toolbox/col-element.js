import React from 'react';

function ColElement() {
  const onDragStart = (e, id) => {
    console.log(`dragStart: ${id}`);
    e.dataTransfer.setData("text/plain", id);

  }
  return (
    <div className="row col-element" draggable
      onDragStart={(e) => onDragStart(e, "col")}>
      COL
    </div>
  );
}

export default ColElement;
