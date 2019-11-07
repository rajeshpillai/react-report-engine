import React from 'react';

function Text({ meta, text, onChange }) {
  const onTextChange = (e) => {
    onChange(meta, e.target.value);
  }

  return (
    <input
      onChange={onTextChange}
      style={{ display: "inline-block", width: "100%" }}
      type="text" defaultValue={text} />
  );
}

export default Text;
