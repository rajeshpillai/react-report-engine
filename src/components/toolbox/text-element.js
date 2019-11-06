import React from 'react';

function TextElement() {
  const onDragStart = (e, id) => {
    console.log(`dragStart: ${id}`);
    e.dataTransfer.setData("text/plain", id);

  }
  return (
    <div className="row text-element" draggable
      onDragStart={(e) => onDragStart(e, "text")}>
      TEXT
    </div>
  );
}

export default TextElement;
