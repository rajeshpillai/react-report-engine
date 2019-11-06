import React from 'react';

function RowElement() {
  const onDragStart = (e, id) => {
    console.log(`dragStart: ${id}`);
    e.dataTransfer.setData("text/plain", id);

  }
  return (
    <div className="row" draggable
      onDragStart={(e) => onDragStart(e, "row")}>
      ROW
    </div>
  );
}

export default RowElement;
