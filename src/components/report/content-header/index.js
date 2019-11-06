import React, { useState, useEffect } from 'react';

function ContentHeader({ data, onUpdate, meta, preview }) {
  const [rows, setRow] = useState([]);

  useEffect(() => {
    console.log('meta: ', meta);
    setRow(meta || []);
  }, []);

  useEffect(() => {
    onUpdate && onUpdate(rows);
  }, [rows]);

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDropHeader = (e, location) => {
    e.preventDefault();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at ${location}`);
    let newRow = { id: +new Date() };
    setRow([...rows, newRow]);
  }

  const onDropRow = (e, location) => {
    // Body Section: Should row be restricted to max 1 as the 
    // tow as to repeat as per the data length
    e.preventDefault();
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at row ${location}`);

    let row = rows.find((r) => r.id == location);
    console.log('found: ', row);


    let newRows = rows.map((r) => {
      if (r.id == location) {
        r.cols = row.cols || [];
        let newCol = { id: +new Date() };
        r.cols.push(newCol);
      }
      return r;
    })

    setRow([...newRows]);
  }

  //todo: Check type of toolbox element being dropped
  const onColumnDrop = (e, row, col) => {
    e.stopPropagation();
    let source = e.dataTransfer.getData("text/plain");
    console.log(`${source} dropped at row ${row}, col ${col}`);
    // Grab the column
    let targetRow = rows.find((r) => r.id == row);
    console.log('found: ', targetRow);

    let newRows = rows.map((r) => {
      if (r.id == row) {
        if (r.cols) {
          r.cols.map((c) => {
            if (c.id == col) {
              c.label = "Label";
            }
            return c;
          })
        }
      }
      return r;
    });

    setRow(newRows);

  }

  const onColClick = (e, target) => {
    //alert(JSON.stringify(target));
    // Grab the column by first grabbing the row
    let fieldName = window.prompt("Enter field name:");

    let newRows = rows.map((r) => {
      if (r.id == target.r) {
        if (r.cols) {
          r.cols.map((c) => {
            if (c.id == target.c) {
              c.field = fieldName;
            }
            return c;
          })
        }
      }
      return r;
    });

    setRow(newRows);
  }


  let design = (
    <div className="report-header"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDropHeader(e, "header")}>
      <h1>Content Header</h1>
      {
        rows.map((r) => {
          return <div key={r.id}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDropRow(e, r.id)}
            className="row report-row edit-mode">
            {r.cols && r.cols.map((c) =>
              <div key={'c' + c.id}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onColumnDrop(e, r.id, c.id)}
                className="col-sm report-col edit-mode"
                onClick={(e) => onColClick(e, { r: r.id, c: c.id })}>
                {c.label}{c.field}
              </div>
            )}
          </div>
        })

      }
    </div>
  );

  let r = rows[0];

  let runtime = (
    <div className="report-header">
      <h1>Content Header</h1>
      {r &&
        <div key={r.id}
          className="row report-row edit-mode">
          {r && r.cols && r.cols.map((c) =>
            <div key={'c' + c.id}
              className="col-sm report-col edit-mode"
              onClick={(e) => onColClick(e, { r: r.id, c: c.id })}>
              {data[c.field]}
            </div>
          )}
        </div>
      }
    </div>
  );

  return (
    preview ? runtime : design
  );
}

export default ContentHeader;
