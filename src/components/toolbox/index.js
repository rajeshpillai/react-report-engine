import React from 'react';

import RowElement from './row-element';
import ColElement from './col-element';

function ToolBox() {
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>TOOLBOX</h4>
      <RowElement />
      <ColElement />
    </div>
  );
}

export default ToolBox;
