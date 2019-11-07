import React from 'react';

function Text({ text }) {
  return (
    <input style={{display:"inline-block",width:"100%"}} type="text" value={text} />
  );
}

export default Text;
