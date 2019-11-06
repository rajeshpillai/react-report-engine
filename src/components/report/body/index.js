import React, { useState, useEffect } from 'react';

let id = 0;
function Body() {
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
    console.log(`${source} dropped at row ${location}`);

    let row = rows.find((r) => r.id == location);
    console.log('found: ', row);


    let newRows = rows.map((r) => {
      if (r.id == location) {
        r.cols = row.cols || [];
        let newCol = { id: ++id };
        r.cols.push(newCol);
      }
      return r;
    })

    setRow([...newRows]);
  }

  return (
    <div className="report-body"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropHeader(e, "header")}>
      <h1>Body</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, r.id)}
            className="row report-row edit-mode">
            {r.cols && r.cols.map((c) =>
              <div key={c.id} className="col-sm report-col edit-mode"></div>
            )}
          </div>
        })
      }
    </div>
  );
}

export default Body;
